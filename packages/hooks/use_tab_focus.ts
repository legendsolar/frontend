import { useEffect } from "react";

export function useTabFocus(onShown: () => void, onHidden: () => void) {
  useEffect(() => {
    const visibilitychangeHandler = () => {
      if (document.hidden) {
        onHidden();
      } else {
        onShown();
      }
    };

    window.addEventListener("visibilitychange", visibilitychangeHandler);
    return () => {
      window.removeEventListener("visibilitychange", visibilitychangeHandler);
    };
  }, []);
}
