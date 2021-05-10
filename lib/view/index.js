const edge = require("edge.js").default;
const path = require("path");
module.exports = (ctx) => {
  const Locations = ctx.container.Locations;
  const rootDir = Locations.get("helper").rootPath;
  edge.mount(path.join(rootDir, "views"));
  ctx.provider("View", function () {
    this.$get = function () {
      return edge;
    };
  });
};
