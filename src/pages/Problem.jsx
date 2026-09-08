import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, AlertTriangle, Terminal } from "lucide-react";
import Badge from "../components/Badge";
import CodeEditor from "../components/CodeEditor";
import TestCase from "../components/TestCase";
import { useApp } from "../context/AppContext";
import { CHALLENGES } from "../data/challenges";
import { runAgainstTestCases } from "../utils/compiler";
import "./Problem.css";

const RUN_SAMPLE_SIZE = 3;

export default function Problem() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { customChallenges, completeChallenge, progress } = useApp();

  const challenge = useMemo(
    () => [...CHALLENGES, ...customChallenges].find((c) => c.slug === slug),
    [slug, customChallenges]
  );

  const sampleCases = challenge ? challenge.testCases.slice(0, RUN_SAMPLE_SIZE) : [];

  const [code, setCode] = useState(challenge?.starterCode || "");
  const [results, setResults] = useState(
    sampleCases.map((tc) => ({ ...tc, passed: null, actual: "", error: null }))
  );
  const [compileError, setCompileError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [gradingProgress, setGradingProgress] = useState(null); // { graded, total } while submitting

  if (!challenge) {
    return (
      <div className="page">
        <div className="problem-not-found">
          <AlertTriangle size={20} />
          <p>That challenge doesn't exist yet.</p>
          <Link to="/challenges">Back to Challenges</Link>
        </div>
      </div>
    );
  }

  const isAlreadyCompleted = progress.completedChallengeIds.includes(challenge.id);

  async function handleRun() {
    setIsRunning(true);
    setCompileError(null);
    const { results: newResults, compileError: err } = await runAgainstTestCases(code, sampleCases);
    setResults(newResults);
    setCompileError(err);
    setHasChecked(true);
    setIsRunning(false);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setCompileError(null);
    setGradingProgress({ graded: 0, total: challenge.testCases.length });

    const { results: newResults, compileError: err } = await runAgainstTestCases(code, challenge.testCases, {
      onProgress: (graded, total) => setGradingProgress({ graded, total }),
    });

    setResults(newResults);
    setCompileError(err);
    setHasChecked(true);
    setIsSubmitting(false);
    setGradingProgress(null);

    if (err) return; // stay on the page so they can read the compiler error

    const passedCount = newResults.filter((r) => r.passed).length;
    completeChallenge(challenge, { passedCount, totalCount: newResults.length });
    navigate(`/result/${challenge.slug}`, {
      state: { passedCount, totalCount: newResults.length },
    });
  }

  function handleReset() {
    setCode(challenge.starterCode);
    setResults(sampleCases.map((tc) => ({ ...tc, passed: null, actual: "", error: null })));
    setCompileError(null);
    setHasChecked(false);
    setGradingProgress(null);
  }

  return (
    <div className="page problem-page">
      <Link to="/challenges" className="problem-back">
        <ChevronLeft size={16} />
        All challenges
      </Link>

      <div className="problem-layout">
        <div className="problem-panel">
          <div className="problem-panel-header">
            <Badge tone={challenge.difficulty.toLowerCase()}>{challenge.difficulty}</Badge>
            {isAlreadyCompleted && <Badge tone="success">Completed</Badge>}
            <Badge tone="xp">+{challenge.xp} XP</Badge>
          </div>

          <h1 className="problem-title">{challenge.title}</h1>
          <p className="problem-description">{challenge.description}</p>

          {challenge.examples?.length > 0 && (
            <div className="problem-section">
              <h3>Example</h3>
              {challenge.examples.map((ex, i) => (
                <div className="problem-example" key={i}>
                  <div>
                    <span className="problem-example-label">Input</span>
                    <pre>{ex.input}</pre>
                  </div>
                  <div>
                    <span className="problem-example-label">Output</span>
                    <pre>{ex.output}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}

          {challenge.inputFormat && (
            <div className="problem-section">
              <h3>Input format</h3>
              <p>{challenge.inputFormat}</p>
            </div>
          )}

          {challenge.outputFormat && (
            <div className="problem-section">
              <h3>Output format</h3>
              <p>{challenge.outputFormat}</p>
            </div>
          )}

          {challenge.constraints?.length > 0 && (
            <div className="problem-section">
              <h3>Constraints</h3>
              <ul className="problem-constraints">
                {challenge.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="problem-workspace">
          <CodeEditor
            code={code}
            onChange={setCode}
            onRun={handleRun}
            onSubmit={handleSubmit}
            onReset={handleReset}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
          />

          {gradingProgress && (
            <p className="problem-grading-status">
              Grading {gradingProgress.graded}/{gradingProgress.total} test cases…
            </p>
          )}

          <div className="problem-tests">
            <h3 className="problem-tests-title">
              <Terminal size={16} />
              Test cases
            </h3>

            {compileError && (
              <div className="problem-compile-error">
                <strong>Compilation error</strong>
                <pre>{compileError}</pre>
              </div>
            )}

            <div className="problem-tests-list">
              {results.map((r, i) => (
                <TestCase
                  key={i}
                  index={i + 1}
                  input={r.input}
                  expected={r.expected}
                  actual={r.actual}
                  error={r.error}
                  status={!hasChecked ? "pending" : r.passed ? "passed" : "failed"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
