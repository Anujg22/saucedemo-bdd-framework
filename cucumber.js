
export default {
  default: {
    paths: ["features/**/*.feature"],
    import: [
      "./support/world.js",
      "./support/hooks.js",
      "./steps/purchase.steps.js"
    ],
    format: ["progress"],
    publishQuiet: true
  }
};
