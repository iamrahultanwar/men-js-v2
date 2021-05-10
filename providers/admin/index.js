const path = require("path");
const edge = require("edge.js").default;
module.exports = (ctx) => {
  const Locations = ctx.container.Locations;
  const Server = ctx.container.Server;
  const rootDir = Locations.get("helper").rootPath;
  edge.mount(path.join(rootDir, "views"));

  Server.get("/admin", async (req, res) => {
    const html = await edge.render("index", {
      greeting: "Hello world",
    });

    return res.send(html);
  });
};
