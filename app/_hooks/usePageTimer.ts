// hooks/usePageTimer.ts
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

export function usePageTimer() {
  const router = useRouter();
  const entryTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const handleRouteChangeStart = () => {
      const exitTime = Date.now();
      const duration = exitTime - entryTimeRef.current;
      console.log(`User spent ${duration / 1000}s on ${router.pathname}`);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router]);
}
