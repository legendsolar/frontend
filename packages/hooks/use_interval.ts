import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTabFocus } from "./use_tab_focus";

export function useInterval(
  callback: () => void,
  delay: number | undefined,
  pauseOnNavigateAway: boolean = false
) {
  const [enabled, setEnabled] = useState(true);

  useTabFocus(
    () => {
      if (pauseOnNavigateAway) {
        setEnabled(true);
      }
    },
    () => {
      if (pauseOnNavigateAway) {
        setEnabled(false);
      }
    }
  );

  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if ((!delay && delay !== 0) || !enabled) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay, enabled]);
}
