/**
 * Design identity for this branch: Design 1 – Editorial Warm (guided by the Intrio reference).
 * Tests use `designId` to pick the screenshots folder.
 */
export const designConfig = {
  designId: "design-1",
  name: "Design 1 – Editorial Warm (Intrio-guided)",
  branch: "design-1",
  description:
    "Editorial, photography-led layout in warm neutrals: cream paper, espresso dark bands, a deep water-blue accent, wide uppercase display type, image-overlay cards, stat counters, scroll reveals and a large 'get in touch' footer. All pages implemented.",
  fonts: { display: "Urbanist", body: "Nunito Sans" },
  colors: {
    cream: "#f2ede4",
    espresso: "#2b211b",
    taupe: "#8c7a6b",
    water: "#1f4e6a",
    bronze: "#a67c52",
    ink: "#1d1814",
  },
} as const;

export type DesignConfig = typeof designConfig;
