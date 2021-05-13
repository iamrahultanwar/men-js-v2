const edge = require("edge.js").default;
const path = require("path");
const express = require("express");
module.exports = (ctx) => {
  const Locations = ctx.container.Locations;
  const Server = ctx.container.Server;
  const rootDir = Locations.get("helper").rootPath;

  const providerList = Locations.get("providers")
    .all()
    .map((provider) => ({
      title: provider,
      path: `/admin/provider/${provider}`,
      icon: null,
    }));

  const pluginList = Locations.get("plugins")
    .all()
    .map((plugin) => ({
      title: plugin,
      path: `?type=${plugin}`,
    }));

  Server.use(express.static("public"));

  edge.global("sideMenuProviders", providerList);
  edge.global("sideMenuPlugins", pluginList);

  edge.mount(path.join(rootDir, "views"));
  edge.mount("providers", path.join(rootDir, "providers"));

  ctx.provider("View", function () {
    this.$get = function () {
      return edge;
    };
  });
};
