import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { SparkRenderer, SplatMesh } from "@sparkjsdev/spark";
import { avatarConfig, type AvatarConfig } from "../../data/avatar";

type Status = "loading" | "ready" | "error";

type CanvasProps = {
  reduceMotion: boolean;
  isMobile: boolean;
  active: boolean;
  onStatus: (status: Status) => void;
};

/**
 * Heavy module: R3F + Spark. Dynamically imported by AvatarScene so the
 * three.js/splat bundle never blocks first paint.
 *
 * The wrapper tracks whether the pointer is over the scene so the subject can
 * settle back to its resting pose when the pointer leaves.
 */
export default function AvatarCanvas({
  reduceMotion,
  isMobile,
  active,
  onStatus,
}: CanvasProps) {
  const [engaged, setEngaged] = useState(true);

  useEffect(() => {
    // Enable tracking when pointer moves across the hero/window
    const onMove = () => setEngaged(true);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative h-full w-full touch-none">
      <Canvas
        className="!absolute inset-0"
        frameloop={active ? "always" : "never"}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 3], fov: 34, near: 0.05, far: 100 }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
        }}
      >
        <SplatAvatar
          config={avatarConfig}
          reduceMotion={reduceMotion}
          isMobile={isMobile}
          engaged={engaged}
          onStatus={onStatus}
        />
      </Canvas>
    </div>
  );
}

type SplatAvatarProps = {
  config: AvatarConfig;
  reduceMotion: boolean;
  isMobile: boolean;
  engaged: boolean;
  onStatus: (status: Status) => void;
};

function percentile(sorted: Float32Array, p: number) {
  if (sorted.length === 0) return 0;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

function SplatAvatar({
  config,
  reduceMotion,
  isMobile,
  engaged,
  onStatus,
}: SplatAvatarProps) {
  const gl = useThree((state) => state.gl) as unknown as THREE.WebGLRenderer;
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
  const size = useThree((state) => state.size);
  const pivotRef = useRef<THREE.Group | null>(null);
  const objectSize = useRef<THREE.Vector3 | null>(null);

  // Frame the camera off the projected subject size + current canvas aspect.
  const fitCamera = useCallback(() => {
    const s = objectSize.current;
    if (!s) return;
    const fov = camera.fov ?? 34;
    const aspect = camera.aspect || 1;
    const halfV = Math.tan(((fov * Math.PI) / 180) / 2);
    const halfH = halfV * aspect;
    const height = Math.max(s.y, 1e-3);
    const width = Math.max(s.x, s.z, 1e-3);
    const distV = height / 2 / halfV;
    const distH = width / 2 / halfH;
    const fill = config.fill > 0.1 ? config.fill : 0.66;
    const dist = Math.max(distV, distH) / fill;
    camera.position.set(0, config.position[1], dist * 1.06);
    camera.lookAt(0, config.position[1], 0);
    camera.updateProjectionMatrix();
  }, [camera, config]);

  useEffect(() => {
    let disposed = false;
    let spark: SparkRenderer | null = null;
    let mesh: SplatMesh | null = null;
    let pivot: THREE.Group | null = null;

    (async () => {
      try {
        const { SparkRenderer, SplatMesh } = await import("@sparkjsdev/spark");
        if (disposed) return;

        spark = new SparkRenderer({ renderer: gl, autoUpdate: true });
        spark.name = "spark-renderer";
        scene.add(spark);

        pivot = new THREE.Group();
        pivot.name = "splat-pivot";
        scene.add(pivot);

        mesh = new SplatMesh({
          url: config.src,
          onLoad: () => onStatus("ready"),
        });
        mesh.name = "abdullah-splat";
        pivot.add(mesh);

        mesh.initialized
          .then(() => {
            if (disposed || !mesh || !pivot) return;

            // Collect splat centres, then transform them by the configured
            // orientation + scale so auto-framing happens in view space.
            const quat = new THREE.Quaternion().setFromEuler(
              new THREE.Euler(
                config.rotation[0],
                config.rotation[1],
                config.rotation[2],
                "XYZ",
              ),
            );
            const xs: number[] = [];
            const ys: number[] = [];
            const zs: number[] = [];
            const point = new THREE.Vector3();
            try {
              mesh.forEachSplat((_index, center) => {
                point
                  .copy(center)
                  .multiplyScalar(config.scale)
                  .applyQuaternion(quat);
                xs.push(point.x);
                ys.push(point.y);
                zs.push(point.z);
              });
            } catch {
              /* bounds optional — fall back to defaults */
            }

            const hasBounds = xs.length > 0;

            // Robust bounds via 1–99 percentile to ignore stray floaters.
            const sX = Float32Array.from(xs).sort();
            const sY = Float32Array.from(ys).sort();
            const sZ = Float32Array.from(zs).sort();
            const min = new THREE.Vector3(
              hasBounds ? percentile(sX, 0.01) : -0.5,
              hasBounds ? percentile(sY, 0.01) : -0.5,
              hasBounds ? percentile(sZ, 0.01) : -0.5,
            );
            const max = new THREE.Vector3(
              hasBounds ? percentile(sX, 0.99) : 0.5,
              hasBounds ? percentile(sY, 0.99) : 0.5,
              hasBounds ? percentile(sZ, 0.99) : 0.5,
            );
            const boundsSize = new THREE.Vector3().subVectors(max, min);
            const center = new THREE.Vector3()
              .addVectors(min, max)
              .multiplyScalar(0.5);

            // Bake orientation/scale on the mesh, then offset so the subject
            // centre sits at the pivot origin.
            mesh.rotation.set(
              config.rotation[0],
              config.rotation[1],
              config.rotation[2],
              "XYZ",
            );
            mesh.scale.setScalar(config.scale);
            mesh.position.set(
              -center.x + config.position[0],
              -center.y + config.position[1],
              -center.z + config.position[2],
            );

            objectSize.current = boundsSize;
            pivotRef.current = pivot;
            fitCamera();
            onStatus("ready");
          })
          .catch(() => {
            if (!disposed) onStatus("error");
          });
      } catch {
        if (!disposed) onStatus("error");
      }
    })();

    return () => {
      disposed = true;
      pivotRef.current = null;
      objectSize.current = null;
      if (mesh) {
        pivot?.remove(mesh);
        mesh.dispose?.();
      }
      if (spark) {
        scene.remove(spark);
        spark.dispose?.();
      }
      if (pivot) scene.remove(pivot);
    };
  }, [gl, scene, config, onStatus, fitCamera]);

  // Re-fit on responsive size changes so the subject never crops or drifts.
  useEffect(() => {
    fitCamera();
  }, [size, fitCamera]);

  useFrame((state, delta) => {
    const pivot = pivotRef.current;
    if (!pivot || reduceMotion) return;

    const t = state.clock.elapsedTime;
    const idle =
      Math.sin(t * config.idleSpeed) *
      config.idleAmplitude *
      (isMobile ? 0.6 : 1);

    // Pointer is normalised relative to the Canvas (the scene), not the page.
    // Touch devices ignore it and rely on the idle drift instead.
    const trackable = engaged && !isMobile;
    const px = trackable ? state.pointer.x : 0;
    const py = trackable ? state.pointer.y : 0;

    const targetY = idle + THREE.MathUtils.clamp(px, -1, 1) * config.pointerRangeY;
    const targetX = THREE.MathUtils.clamp(-py, -1, 1) * config.pointerRangeX;

    // Frame-rate independent damping toward the target pose.
    const k = 1 - Math.exp(-config.damping * Math.min(delta, 0.1));
    pivot.rotation.y += (targetY - pivot.rotation.y) * k;
    pivot.rotation.x += (targetX - pivot.rotation.x) * k;
  });

  return null;
}
