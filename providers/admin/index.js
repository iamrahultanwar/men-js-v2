const express = require("express");
const path = require("path");

module.exports = (ctx) => {
  const Locations = ctx.container.Locations;
  const Server = ctx.container.Server;

  const rootDir = Locations.get("helper").rootPath;
  Server.use(express.static(path.join(rootDir, "public")));

  Server.get("/admin", function (req, res) {
    res.sendFile(path.join(rootDir, "public", "index.html"));
  });
};
