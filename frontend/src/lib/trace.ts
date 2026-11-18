/**
 * SVG path for a looping heartbeat trace.
 *
 * Draws `count` beats twice over, so a strip can slide left by exactly one
 * loop (count × period units) and repeat without a visible seam.
 *
 * @param count  beats per loop
 * @param period width of one beat, in SVG units
 * @param spike  height of the main spike
 * @param wobble how far the baseline wanders (0 = steady)
 * @param base   y position of the baseline
 */
export function tracePath(count: number, period: number, spike: number, wobble = 0, base = 34): string {
  const k = period / 120;
  const pts: string[] = [`M0 ${base}`];
  for (let i = 0; i < count * 2; i++) {
    const x = i * period;
    // Baseline wander repeats every `count` beats, which keeps the loop seamless.
    const b = base + Math.sin(((i % count) / count) * Math.PI * 2) * wobble;
    const at = (dx: number, dy: number) => `${(x + dx * k).toFixed(1)} ${(b + dy).toFixed(1)}`;
    pts.push(
      `L${at(38, 0)}`,
      `Q${at(46, -5)} ${at(54, 0)}`,
      `L${at(61, 0)}`,
      `L${at(65, 4)}`,
      `L${at(70, -spike)}`,
      `L${at(75, 9)}`,
      `L${at(79, 0)}`,
      `L${at(87, 0)}`,
      `Q${at(97, -8)} ${at(107, 0)}`,
      `L${at(120, 0)}`
    );
  }
  return pts.join(" ");
}

/** Four calm beats per 480-unit loop. Pair with the `sigRun` keyframes. */
export const CALM_TRACE = tracePath(4, 120, 26, 0);
