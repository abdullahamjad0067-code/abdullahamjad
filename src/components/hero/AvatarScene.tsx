import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useDocumentVisible } from "../../hooks/useDocumentVisible";
import { avatarConfig } from "../../data/avatar";
import { AvatarFallback } from "./AvatarFallback";

const AvatarCanvas = lazy(() => import("./AvatarCanvas"));

type Status = "idle" | "loading" | "ready" | "error";

function detectWebGL2() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGL2RenderingContext && canvas.getContext("webgl2"),
    );
  } catch {
    return false;
  }
}

export function AvatarScene() {
  const reduceMotion = Boolean(useReducedMotion());
  const isMobile = useMediaQuery("(max-width: 767px)");
  const visible = useDocumentVisible();
  const [status, setStatus] = useState<Status>("idle");
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(true);

  // Stable identity so the 3D load effect doesn't tear down + reload the
  // mesh every time status changes.
  const handleStatus = useCallback((s: Status) => setStatus(s), []);

  useEffect(() => {
    const isSupported = detectWebGL2();
    setWebgl(isSupported);
    if (isSupported) {
      setStatus("loading");
      setMounted(true);
    }
  }, []);

  const showCanvas = webgl && mounted && status !== "error";

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem] md:max-w-none md:aspect-[4/5] lg:aspect-[3/4]">
      <div className="absolute inset-0">
        {showCanvas && (
          <Suspense fallback={null}>
            <AvatarCanvas
              reduceMotion={reduceMotion}
              isMobile={isMobile}
              active={visible}
              onStatus={handleStatus}
            />
          </Suspense>
        )}

        {status === "error" && <AvatarFallback />}
      </div>

      {status === "loading" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-x-0 bottom-2 text-center mono-label text-faint"
        >
          {avatarConfig.label}
        </motion.p>
      )}
    </div>
  );
}
