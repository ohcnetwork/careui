import * as React from "react";

const PUNCT = new Set([".", ",", "!", "?", ";", ":"]);

/**
 * Returns an `onBeforeInput` handler that auto-inserts a space after
 * punctuation (. , ! ? ; :) when the next character typed is not already
 * a space.
 *
 * Why `onBeforeInput`:
 * - Fires *before* the DOM is mutated → no need to fix the value afterward
 * - O(1): only inspects `value[cursor - 1]`, never scans the full string
 * - No cursor jump: `document.execCommand` handles insertion + cursor natively
 * - No re-renders, no native-setter hacks, no `useLayoutEffect` needed
 *
 * Special cases that are left untouched:
 * - Decimal numbers: "3.1" — digit · dot · digit
 * - The typed character is whitespace or punctuation itself
 */
export function useAutoSpace(
  enabled: boolean,
): React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> {
  return React.useCallback(
    (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!enabled) return;

      const event = e.nativeEvent as InputEvent;
      const char = event.data;

      // Only handle single printable character insertions.
      if (!char || char.length !== 1) return;

      // Skip if the character being typed is itself whitespace or punctuation.
      if (/\s/.test(char) || PUNCT.has(char)) return;

      const el = e.currentTarget;
      const cursor = el.selectionStart ?? 0;
      if (cursor === 0) return;

      const prevChar = el.value[cursor - 1];
      if (!PUNCT.has(prevChar)) return;

      // Exception: decimal / version numbers — digit.digit → "3.14", "1.0.2"
      if (prevChar === "." && /\d/.test(char)) {
        const beforeDot = cursor >= 2 ? el.value[cursor - 2] : "";
        if (/\d/.test(beforeDot)) return;
      }

      // Intercept the keystroke and re-insert as " <char>".
      // execCommand preserves undo history and positions the cursor correctly.
      event.preventDefault();
      document.execCommand("insertText", false, " " + char);
    },
    [enabled],
  );
}
