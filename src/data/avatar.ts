/**
 * 3D subject configuration — single place to change the asset.
 *
 * The supplied model is a 3D Gaussian Splatting capture (binary little-endian
 * PLY, ~40.6k gaussians) rendered with @sparkjsdev/spark.
 *
 * Orientation note: the capture is stored Z-up with the face pointing along
 * +Y. In this Y-up scene, the base rotation that stands it upright and turns it
 * toward the camera is `[-PI/2, 0, PI]` (XYZ order). Verified against the
 * projected splat centres — see the docs on `rotation` below.
 *
 * To swap the model:
 *   1. Drop the new file into /public/models/
 *   2. Update `src` below (GLB/GLTF, SPZ, SPLAT and PLY are all supported)
 *   3. Adjust `rotation` / `scale` / `fill` if framing needs it
 */
export const avatarConfig = {
  /** Public path to the splat/model file. */
  src: "/models/abdullah-avatar.splat",
  /** Base orientation as an XYZ Euler triple (radians). */
  rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
  /** Uniform scale applied to the loaded model. */
  scale: 1,
  /** Fine position nudge (world units) after auto-centering. */
  position: [0, 0, 0] as [number, number, number],
  /** Fraction of the smaller viewport axis the subject should fill. */
  fill: 0.66,
  /** Gentle idle drift — used at rest and on touch devices. */
  idleAmplitude: 0.06,
  idleSpeed: 0.35,
  /**
   * Pointer-driven head/body turn range in radians.
   * Engaging range so user feels direct, responsive control of the mascot.
   */
  pointerRangeY: 0.65,
  pointerRangeX: 0.35,
  /** Exponential damping factor (snappy, responsive tracking). */
  damping: 4.8,
  /** Optional caption shown with the loading indicator. */
  label: "Loading 3D capture",
} as const;

export type AvatarConfig = typeof avatarConfig;
