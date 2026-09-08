import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Button from "./Button";
import { useCodeTextarea } from "../hooks/useCodeTextarea";
import "./ProblemForm.css";

const DEFAULT_STARTER = `import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Write your code here
    }
}
`;

const emptyTestCase = () => ({ input: "", expected: "" });

export default function ProblemForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [category, setCategory] = useState("");
  const [xp, setXp] = useState(50);
  const [points, setPoints] = useState(100);
  const [starterCode, setStarterCode] = useState(DEFAULT_STARTER);
  const { textareaRef: starterCodeRef, handleKeyDown: handleStarterCodeKeyDown } = useCodeTextarea(
    starterCode,
    setStarterCode
  );
  const [testCases, setTestCases] = useState([emptyTestCase()]);
  const [submitted, setSubmitted] = useState(false);

  function updateTestCase(index, field, value) {
    setTestCases((prev) => prev.map((tc, i) => (i === index ? { ...tc, [field]: value } : tc)));
  }

  function addTestCase() {
    setTestCases((prev) => [...prev, emptyTestCase()]);
  }

  function removeTestCase(index) {
    setTestCases((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    onCreate({
      id: `custom-${Date.now()}`,
      title: title.trim(),
      slug: slug || `custom-${Date.now()}`,
      level: 0,
      difficulty,
      category: category.trim() || "Custom",
      xp: Number(xp) || 0,
      points: Number(points) || 0,
      description: description.trim(),
      inputFormat: "Defined by the challenge author.",
      outputFormat: "Defined by the challenge author.",
      constraints: [],
      examples: testCases[0] ? [{ input: testCases[0].input, output: testCases[0].expected }] : [],
      starterCode,
      testCases: testCases.filter((tc) => tc.input.trim() !== "" || tc.expected.trim() !== ""),
      isCustom: true,
    });

    setSubmitted(true);
    setTitle("");
    setDescription("");
    setCategory("");
    setXp(50);
    setPoints(100);
    setStarterCode(DEFAULT_STARTER);
    setTestCases([emptyTestCase()]);
    setTimeout(() => setSubmitted(false), 3500);
  }

  return (
    <form className="problem-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field">
          <span>Problem Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Sort a Small Array" required />
        </label>

        <label className="form-field">
          <span>Category</span>
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Arrays" />
        </label>

        <label className="form-field">
          <span>Difficulty</span>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>

        <label className="form-field">
          <span>XP Reward</span>
          <input type="number" min="0" value={xp} onChange={(e) => setXp(e.target.value)} />
        </label>

        <label className="form-field">
          <span>Points</span>
          <input type="number" min="0" value={points} onChange={(e) => setPoints(e.target.value)} />
        </label>
      </div>

      <label className="form-field">
        <span>Description</span>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Explain what the solver needs to do…"
          required
        />
      </label>

      <label className="form-field">
        <span>Starter Code (Java)</span>
        <textarea
          ref={starterCodeRef}
          className="form-code code-surface"
          rows={10}
          value={starterCode}
          onChange={(e) => setStarterCode(e.target.value)}
          onKeyDown={handleStarterCodeKeyDown}
          spellCheck={false}
        />
      </label>

      <div className="form-testcases">
        <div className="form-testcases-header">
          <span>Test Cases</span>
          <span className="form-hint">Input is sent to stdin; expected output is compared to stdout.</span>
        </div>

        {testCases.map((tc, i) => (
          <div className="form-testcase-row" key={i}>
            <label className="form-field">
              <span>Test Case {i + 1} — Input</span>
              <textarea
                rows={2}
                className="code-surface"
                value={tc.input}
                onChange={(e) => updateTestCase(i, "input", e.target.value)}
              />
            </label>
            <label className="form-field">
              <span>Expected Output</span>
              <textarea
                rows={2}
                className="code-surface"
                value={tc.expected}
                onChange={(e) => updateTestCase(i, "expected", e.target.value)}
              />
            </label>
            <button
              type="button"
              className="form-remove-testcase"
              onClick={() => removeTestCase(i)}
              title="Remove test case"
              disabled={testCases.length === 1}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}

        <Button variant="ghost" size="sm" icon={Plus} onClick={addTestCase}>
          Add Test Case
        </Button>
      </div>

      <div className="form-footer">
        {submitted && <span className="form-success">Challenge created — check the Challenges page.</span>}
        <Button type="submit" variant="primary" size="lg">
          Create Challenge
        </Button>
      </div>
    </form>
  );
}
