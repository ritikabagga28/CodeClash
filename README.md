# Code Arena — Java Practice, RPG-Style

A frontend-only React prototype for practicing Java: pick a challenge, write
real Java, run it on a real online compiler, earn XP, clear levels.

Built for a first frontend evaluation — the focus is UI/UX, component
structure, React state, and routing, not a production judge system.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production
build in `dist/`.

## Why this isn't a fake code runner

Every "Run Code" / "Submit" click sends the student's Java source to a real
online compiler and shows the actual compiler/runtime output — including
genuine compile errors. See `src/utils/compiler.js`; it's the one file
you'd swap for a self-hosted judge in a later evaluation.

**This project uses [Judge0 CE](https://ce.judge0.com), not Piston.** It
originally used Piston (`emkc.org`), but as of **Feb 15, 2026 Piston closed
public access** — its API now returns `HTTP 401` unless you've been
personally granted a key by the maintainer on Discord (see
[github.com/engineer-man/piston](https://github.com/engineer-man/piston)).
That's the exact error you'd see if you tried the old setup today. Judge0
CE's public demo host doesn't require a key, so that's what's wired up now.

Each challenge (`src/data/challenges.js`) is a **complete, runnable Java
program** that reads input from stdin (`Scanner`) and prints to stdout, the
same shape as a real judge (Codeforces/HackerRank-style), rather than a bare
function stub.

A few things worth knowing:
- It needs an internet connection at runtime (the browser calls Judge0
  directly — no backend of ours involved).
- Judge0 CE's public host is a shared community demo instance, not a paid
  production tier. It can be slow, rate-limited, or (like Piston before it)
  change its access policy in the future. If that happens, swap the base
  URL and request/response shape in `compiler.js` — nothing else changes.

## Run vs. Submit

These check different amounts of work, like a real judge:

- **Run Code** checks your program against the **first 3 test cases only** —
  a quick sanity check. Same pass/fail card UI as Submit, just fewer cards.
- **Submit** checks your code against the **full test suite — about 100
  cases per challenge**, including deliberate edge cases (see below), and
  is the only action that awards XP or marks a challenge complete.

Because Submit can mean up to ~100 real network round trips to the online
compiler, `runAgainstTestCases` (in `compiler.js`) runs them in batches of 5
concurrent requests rather than one at a time — a fully sequential run would
take minutes. A "Grading X/100 test cases…" line shows under the editor
while it's in progress. If your code doesn't compile, that's detected on
the very first case and the rest are marked failed locally without any more
network calls (compiling the same broken source 100 times would be pure
waste).

## Test cases

Each of the 8 built-in challenges ships **100 test cases**, generated with a
seeded random generator and checked two different ways before being
committed:
1. Every expected output was computed from a reference JS implementation of
   the algorithm.
2. Every one of those 800 outputs was then re-checked against a **second,
   independently-written** implementation using a different algorithm/scan
   order (e.g. Two Sum's hashmap single-pass vs. the generator's nested-loop
   scan) — all 800 agreed.

A handful of the original hand-picked edge cases (single-element arrays,
all-negative arrays, zeros, boundary values at the stated constraints like
±10⁶) are seeded at the front of each list, with the rest randomly
generated within the same constraints. Two Sum's inputs are generated with
rejection sampling so each array has **exactly one** valid answer — without
that, a correct solution using a different scan order than the generator's
could get marked wrong for returning a different (also valid) index pair.

## Code editor behavior

The editor (`src/hooks/useCodeTextarea.js`) picks up a few habits real
editors have, without becoming a real IDE:

- **Tab** inserts 4 spaces instead of jumping focus out of the textarea.
- **Typing `{`, `(`, `[`, `"`, or `'`** auto-inserts the matching closer,
  cursor between them — quotes included, so a stray `"` or `'` never gets
  left hanging.
- **Typing a closer** that's already sitting there (because it was
  auto-inserted) steps over it instead of duplicating it.
- **Enter right after `{`** indents the new line one level deeper. Enter
  with the cursor between an auto-closed `{}` opens a proper indented block
  — `{` newline, indented cursor, newline, `}` — instead of leaving
  everything on one line.
- **Backspace** between an empty auto-closed pair (`{|}`, `"|"`) removes
  both characters at once.

This applies to the main challenge editor and the Create Problem form's
starter-code field (same hook, both places). It has no idea what's inside a
string or comment — a `"` always toggles a pair, even mid-string — which is
a real limitation of a plain textarea, not an oversight; a fully
string-aware editor is real-IDE territory, which is explicitly out of scope
here.

## Login

`/login` is a UI-only mock: any username/password "signs you in" and stores
a flag in `AppContext` (mirrored to localStorage), no backend involved. The
sidebar's Profile slot reflects it. Real authentication is an Evaluation-2
item per the original brief; this just gives the flow somewhere to live.

## Settings

The sidebar's "Settings" link now actually goes somewhere (`/settings`) —
previously it was a dead button. From there you can log out and reset your
saved progress (XP, points, completed challenges), with a two-click confirm
on the reset so it can't be triggered by accident.

## Sidebar

Click the chevron next to the "Code Arena" wordmark to collapse the sidebar
to an icon-only rail (desktop only — on narrow screens it's already a
bottom nav bar, so the toggle is hidden there).

## Project structure

```
src/
  data/challenges.js     Static challenge bank (Java-only) + level thresholds
  context/AppContext.jsx XP/points/streak/auth state, persisted to localStorage
  utils/compiler.js      Judge0 CE API client (real compile + run)
  hooks/useCodeTextarea.js  Auto-indent / bracket-closing for plain textareas
  components/            Reusable UI: Button, Badge, ProgressBar, StatCard,
                          ChallengeCard, LevelCard, TestCase, CodeEditor,
                          ProblemForm, Sidebar (collapsible)
  pages/                 Home, Dashboard, Challenges, Problem, LevelComplete,
                          CreateProblem, Achievements, Progress, Login, Settings
```

## Scope (deliberately left out for this evaluation)

No backend, database, real authentication, Docker, real judge sandboxing
beyond Judge0, leaderboards, WebSockets, or payments — per the brief.
`AppContext` and `challenges.js` are shaped so a later evaluation can swap
localStorage for real API calls without touching page/component code.

## Language

Java only. The code editor has no language switcher; the "Language" chip in
the editor toolbar is fixed. Every starter template, test case, and custom
problem form field is Java-shaped (stdin in, stdout out).
