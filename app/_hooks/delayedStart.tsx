"use client";

import { useEffect, useState } from "react";

export function useDelayedTrue(open: boolean): boolean {
  const delay = 2000;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (open) {
      setReady(true); // ✅ true while counting
      timer = setTimeout(() => setReady(false), delay); // ✅ false after delay
    } else {
      setReady(false); // reset if closed
    }

    return () => clearTimeout(timer);
  }, [open, delay]);

  return ready;
}
