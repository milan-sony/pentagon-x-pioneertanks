/**
 * Design identity for this branch. Each design branch overrides this file.
 * Tests use `designId` to pick the screenshots folder.
 */
export const designConfig = {
  designId: "baseline",
  name: "Baseline (no design applied)",
  branch: "main",
  description: "Design-agnostic baseline: content, shared components and test harness. Design branches replace this file.",
  fonts: { display: "Inter", body: "Inter" },
  colors: {
    primary: "#1b1d1f",
    accent: "#0b2545",
    background: "#ffffff",
    surface: "#f3f5f7",
    text: "#101418",
  },
} as const;

export type DesignConfig = typeof designConfig;
