import { useRef, useLayoutEffect, useCallback } from "react";

// ============================================================================
// A handful of habits every real code editor has that a plain <textarea>
// doesn't: pressing Enter after `{` indents the next line (and, if you're
// sitting right between `{` and `}`, opens a properly-indented block for
// you); typing an opening bracket OR quote auto-inserts its closing partner
// instead of making you remember to close it yourself; typing a closer
// that's already sitting there (because it was auto-inserted) just steps
// over it instead of duplicating it; and Backspace between an empty pair
// removes both at once.
//
// This intentionally stops short of being a real editor (no syntax
// highlighting, no string/comment awareness — a `"` always toggles a pair
// even mid-string) — see components/CodeEditor.jsx for why that's a
// deliberate scope line, not an oversight.
// ============================================================================

const BRACKET_PAIRS = { "{": "}", "(": ")", "[": "]" };
const CLOSERS = new Set(Object.values(BRACKET_PAIRS));
const QUOTE_CHARS = new Set(['"', "'"]);
// Used only to detect "empty pair" on Backspace — quotes open and close
// with the same character, unlike brackets.
const AUTO_CLOSE_PAIRS = { ...BRACKET_PAIRS, '"': '"', "'": "'" };

function currentLineIndent(text) {
  const match = text.match(/^[ \t]*/);
  return match ? match[0] : "";
}

export function useCodeTextarea(value, onChange) {
  const textareaRef = useRef(null);
  const pendingSelection = useRef(null);

  // Controlled <textarea> re-renders with the new `value` before we get a
  // chance to move the cursor, so we stash where the cursor *should* end up
  // and apply it right after that render commits.
  useLayoutEffect(() => {
    if (pendingSelection.current && textareaRef.current) {
      const { start, end } = pendingSelection.current;
      textareaRef.current.setSelectionRange(start, end);
      pendingSelection.current = null;
    }
  }, [value]);

  const applyEdit = useCallback(
    (nextValue, cursorPos) => {
      pendingSelection.current = { start: cursorPos, end: cursorPos };
      onChange(nextValue);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e) => {
      const textarea = e.currentTarget;
      const { selectionStart, selectionEnd, value: text } = textarea;
      const hasSelection = selectionStart !== selectionEnd;

      // Tab -> 4 spaces, instead of jumping focus out of the editor.
      if (e.key === "Tab") {
        e.preventDefault();
        const next = text.slice(0, selectionStart) + "    " + text.slice(selectionEnd);
        applyEdit(next, selectionStart + 4);
        return;
      }

      // Typing an opening bracket inserts the closing one too, cursor
      // between them, so every `{`, `(`, `[` you type is already closed.
      if (BRACKET_PAIRS[e.key] && !hasSelection) {
        e.preventDefault();
        const closer = BRACKET_PAIRS[e.key];
        const next = text.slice(0, selectionStart) + e.key + closer + text.slice(selectionEnd);
        applyEdit(next, selectionStart + 1);
        return;
      }

      // Typing a closing bracket that's already sitting right there (because
      // we auto-inserted it) just steps over it instead of adding a second one.
      if (CLOSERS.has(e.key) && !hasSelection && text[selectionStart] === e.key) {
        e.preventDefault();
        textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);
        return;
      }

      // Quotes open and close with the same character, so typing " or '
      // either starts a new pair (cursor lands between them) or, if one's
      // already sitting right there, just steps over it — same idea as
      // brackets above, just without a distinct opener/closer.
      if (QUOTE_CHARS.has(e.key) && !hasSelection) {
        e.preventDefault();
        if (text[selectionStart] === e.key) {
          textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);
        } else {
          const next = text.slice(0, selectionStart) + e.key + e.key + text.slice(selectionEnd);
          applyEdit(next, selectionStart + 1);
        }
        return;
      }

      // Enter: keep the current line's indent, add one more level after an
      // opening brace, and if we're right inside `{}` (cursor between them),
      // push the closing brace onto its own line and land the cursor,
      // indented, in the middle — the standard "open a block" shape.
      if (e.key === "Enter") {
        e.preventDefault();
        const before = text.slice(0, selectionStart);
        const after = text.slice(selectionEnd);
        const lineSoFar = before.slice(before.lastIndexOf("\n") + 1);
        const indent = currentLineIndent(lineSoFar);
        const opensBlock = lineSoFar.trimEnd().endsWith("{");
        const closesImmediately = after.startsWith("}");

        if (opensBlock && closesImmediately) {
          const inner = indent + "    ";
          const next = before + "\n" + inner + "\n" + indent + after;
          applyEdit(next, before.length + 1 + inner.length);
        } else {
          const nextIndent = opensBlock ? indent + "    " : indent;
          const next = before + "\n" + nextIndent + after;
          applyEdit(next, before.length + 1 + nextIndent.length);
        }
        return;
      }

      // Backspace right between an empty pair (e.g. `{|}` or `"|"`) removes
      // both characters at once rather than leaving a dangling closer.
      if (e.key === "Backspace" && !hasSelection && selectionStart > 0) {
        const charBefore = text[selectionStart - 1];
        const charAfter = text[selectionStart];
        if (AUTO_CLOSE_PAIRS[charBefore] === charAfter) {
          e.preventDefault();
          const next = text.slice(0, selectionStart - 1) + text.slice(selectionStart + 1);
          applyEdit(next, selectionStart - 1);
        }
      }
    },
    [applyEdit]
  );

  return { textareaRef, handleKeyDown };
}
