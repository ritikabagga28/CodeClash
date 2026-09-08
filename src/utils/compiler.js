// ============================================================================
// A thin client around Judge0 CE (https://ce.judge0.com), a free public
// online code execution engine. We deliberately do NOT ship our own Java
// interpreter or fake the execution — every Run/Submit click sends the
// student's real source code here and gets back a real compiler/runtime
// result (including genuine compile errors).
//
// Why Judge0 and not Piston: this project originally used Piston
// (emkc.org). As of Feb 15, 2026 the Piston maintainer closed public
// access — the API now returns 401 Unauthorized unless you've been
// personally granted a key on Discord (see github.com/engineer-man/piston).
// Judge0 CE's demo host is still open with no key required, so that's
// what's wired up below.
//
// If your evaluation environment blocks third-party APIs, or Judge0 ever
// locks down the same way, this is the only file you need to swap for a
// self-hosted judge service.
// ============================================================================

const JUDGE0_BASE = "https://ce.judge0.com";
const FALLBACK_JAVA_LANGUAGE_ID = 62; // Java (OpenJDK 13.0.1) — used only if /languages is unreachable

let cachedJavaLanguageId = null;

function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str ?? "")));
}

function fromBase64(str) {
  if (!str) return "";
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return atob(str);
  }
}

async function resolveJavaLanguageId() {
  if (cachedJavaLanguageId) return cachedJavaLanguageId;
  try {
    const res = await fetch(`${JUDGE0_BASE}/languages`);
    if (!res.ok) throw new Error("language lookup failed");
    const languages = await res.json();
    // Match "Java (OpenJDK ...)" but not "JavaScript (...)".
    const javaRuntimes = languages.filter((l) => /^java\s*\(/i.test(l.name));
    javaRuntimes.sort((a, b) => b.id - a.id); // newest listed runtime first
    cachedJavaLanguageId = javaRuntimes[0]?.id ?? FALLBACK_JAVA_LANGUAGE_ID;
  } catch {
    cachedJavaLanguageId = FALLBACK_JAVA_LANGUAGE_ID;
  }
  return cachedJavaLanguageId;
}

/**
 * Compile + run one Java source file against a single stdin string using
 * the real Judge0 online compiler.
 *
 * @param {string} sourceCode - full Java source, must contain `public class Main`
 * @param {string} stdin - input fed to System.in
 * @returns {Promise<{status: 'success'|'compile_error'|'runtime_error'|'network_error', stdout: string, stderr: string}>}
 */
export async function runJavaCode(sourceCode, stdin = "") {
  try {
    const language_id = await resolveJavaLanguageId();

    const submitRes = await fetch(`${JUDGE0_BASE}/submissions?base64_encoded=true&wait=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_code: toBase64(sourceCode),
        language_id,
        stdin: toBase64(stdin),
      }),
    });

    if (!submitRes.ok) {
      return {
        status: "network_error",
        stdout: "",
        stderr: `Compiler service responded with HTTP ${submitRes.status}. Please try again in a moment.`,
      };
    }

    let data = await submitRes.json();

    // `wait=true` should return a finished submission, but Judge0 can hand
    // back a still-queued job under load — poll briefly rather than give up.
    let attempts = 0;
    while (data.status && (data.status.id === 1 || data.status.id === 2) && attempts < 5) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const pollRes = await fetch(`${JUDGE0_BASE}/submissions/${data.token}?base64_encoded=true`);
      if (!pollRes.ok) break;
      data = await pollRes.json();
      attempts += 1;
    }

    const stdout = fromBase64(data.stdout);
    const stderr = fromBase64(data.stderr);
    const compileOutput = fromBase64(data.compile_output);
    const statusId = data.status?.id;

    if (statusId === 6) {
      return { status: "compile_error", stdout: "", stderr: compileOutput || "Compilation failed." };
    }

    // Status IDs 7–12 are Judge0's runtime-failure family (SIGSEGV, SIGFPE,
    // non-zero exit, etc). 13/14 are internal/exec-format errors.
    if (statusId >= 7 && statusId <= 14) {
      return {
        status: "runtime_error",
        stdout,
        stderr: stderr || data.status?.description || "The program crashed while running.",
      };
    }

    return {
      status: "success",
      stdout: stdout.replace(/\s+$/g, ""),
      stderr,
    };
  } catch {
    return {
      status: "network_error",
      stdout: "",
      stderr:
        "Couldn't reach the online compiler. Check your internet connection and try again.",
    };
  }
}

/**
 * Run source code against every test case and report per-case pass/fail
 * based on the compiler's real stdout, not a simulation.
 *
 * Test suites can now run into the hundreds of cases (see Submit), and
 * Judge0 is a real network round trip per case — running them one at a time
 * would take minutes. This fires a small batch of requests concurrently at
 * once instead. `onProgress(gradedCount, total)` fires after each batch so
 * the UI can show something better than a frozen spinner.
 */
export async function runAgainstTestCases(sourceCode, testCases, { concurrency = 5, onProgress } = {}) {
  const results = new Array(testCases.length);
  let compileError = null;

  for (let start = 0; start < testCases.length; start += concurrency) {
    if (compileError) {
      // Already confirmed this exact source won't compile — no point
      // burning more API calls re-proving that for every remaining case.
      for (let i = start; i < testCases.length; i++) {
        results[i] = { ...testCases[i], passed: false, actual: "", error: "Compilation error" };
      }
      break;
    }

    const batch = testCases.slice(start, start + concurrency);
    const batchResults = await Promise.all(batch.map((tc) => runJavaCode(sourceCode, tc.input)));

    batchResults.forEach((result, i) => {
      const testCase = batch[i];
      const index = start + i;

      if (result.status === "compile_error") {
        compileError = result.stderr;
        results[index] = { ...testCase, passed: false, actual: "", error: "Compilation error" };
        return;
      }

      if (result.status === "network_error") {
        results[index] = { ...testCase, passed: false, actual: "", error: result.stderr };
        return;
      }

      const actual = result.stdout.trim();
      const expected = testCase.expected.trim();
      results[index] = {
        ...testCase,
        passed: actual === expected,
        actual,
        error: result.status === "runtime_error" ? result.stderr : null,
      };
    });

    onProgress?.(Math.min(start + concurrency, testCases.length), testCases.length);
  }

  return { results, compileError };
}
