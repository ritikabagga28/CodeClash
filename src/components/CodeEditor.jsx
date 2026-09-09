import { useMemo, useRef } from "react";
import { Play, Send, RotateCcw, Terminal } from "lucide-react";
import Button from "./Button";
import { useCodeTextarea } from "../hooks/useCodeTextarea";
import "./CodeEditor.css";

/**
 * A deliberately simple code surface: a styled <textarea> with a line-number
 * gutter, not a real IDE. Compilation and execution are never faked here —
 * this component just captures the source; Run/Submit hand off to the real
 * online compiler in utils/compiler.js via the onRun/onSubmit callbacks.
 *
 * It does pick up the handful of typing habits that make a plain textarea
 * feel less hostile for writing Java in — auto-indent and bracket-closing
 * from useCodeTextarea — without becoming a syntax-highlighting IDE.
 */
export default function CodeEditor({ code, onChange, onRun, onSubmit, onReset, isRunning, isSubmitting }) {
  const lineCount = useMemo(() => Math.max(code.split("\n").length, 1), [code]);
  const lineNumbers = useMemo(() => Array.from({ length: lineCount }, (_, i) => i + 1), [lineCount]);
  const gutterRef = useRef(null);
  const { textareaRef, handleKeyDown } = useCodeTextarea(code, onChange);

  function syncGutterScroll(e) {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.target.scrollTop;
    }
  }

  return (
    <div className="editor">
      <div className="editor-toolbar">
        <span className="editor-lang">
          <Terminal size={14} />
          Java 17
        </span>
        <button type="button" className="editor-reset" onClick={onReset} title="Reset to starter code">
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      <div className="editor-surface">
        <div className="editor-gutter" aria-hidden="true" ref={gutterRef}>
          {lineNumbers.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="editor-textarea code-surface"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={syncGutterScroll}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          wrap="off"
          aria-label="Java code editor"
        />
      </div>

      <div className="editor-actions">
        <Button variant="ghost" icon={Play} onClick={onRun} loading={isRunning} disabled={isSubmitting}>
          Run Code
        </Button>
        <Button variant="success" icon={Send} onClick={onSubmit} loading={isSubmitting} disabled={isRunning}>
          Submit
        </Button>
      </div>
    </div>
  );
}
