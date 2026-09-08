import { CheckCircle2, XCircle, Circle } from "lucide-react";
import "./TestCase.css";

/**
 * status: 'pending' | 'passed' | 'failed'
 * When failed, actual/error come straight from the online compiler's
 * real stdout/stderr — never a hard-coded guess.
 */
export default function TestCase({ index, input, expected, status, actual, error }) {
  return (
    <div className={`testcase testcase-${status}`}>
      <div className="testcase-header">
        <span className="testcase-icon">
          {status === "passed" && <CheckCircle2 size={16} />}
          {status === "failed" && <XCircle size={16} />}
          {status === "pending" && <Circle size={14} />}
        </span>
        <span className="testcase-title">Test Case {index}</span>
        {status === "passed" && <span className="testcase-verdict testcase-verdict-pass">Passed</span>}
        {status === "failed" && <span className="testcase-verdict testcase-verdict-fail">Failed</span>}
      </div>

      <div className="testcase-io">
        <div>
          <span className="testcase-io-label">Input</span>
          <pre className="testcase-io-value">{input}</pre>
        </div>
        <div>
          <span className="testcase-io-label">Expected</span>
          <pre className="testcase-io-value">{expected}</pre>
        </div>
        {status !== "pending" && !error && (
          <div>
            <span className={`testcase-io-label${status === "failed" ? " testcase-io-label-fail" : ""}`}>
              Your output
            </span>
            <pre className={`testcase-io-value${status === "failed" ? " testcase-io-value-fail" : ""}`}>
              {actual || "(empty)"}
            </pre>
          </div>
        )}
      </div>

      {error && <pre className="testcase-error">{error}</pre>}
    </div>
  );
}
