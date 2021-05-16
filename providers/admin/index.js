const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
AdminBro.registerAdapter(AdminBroMongoose);

const path = require("path");

module.exports = (ctx) => {
  const { View, Server, Models } = ctx.container;
  const models = Array.from(Models.keys());
  const resources = Array.from(Models.keys()).map((modelKey) =>
    Models.get(modelKey)
  );

  const adminBro = new AdminBro({
    resources: resources,
    rootPath: "/admin-bro",
    dashboard: {
      handler: async () => {
        return { models };
      },
      component: AdminBro.bundle(path.join(__dirname, "dashboard.jsx")),
    },
    sidebar: {
      handler: async () => {
        return { some: "output" };
      },
      component: AdminBro.bundle(path.join(__dirname, "dashboard.jsx")),
    },
  });

  const router = AdminBroExpress.buildRouter(adminBro);

  Server.use(adminBro.options.rootPath, router);

  Server.get("/admin", async (req, res) => {
    const html = await View.render("pages/home");
    return res.send(html);
  });

  Server.get("/admin/provider/:provider", async (req, res) => {
    const { provider } = req.params;
    const html = await View.render("pages/provider", {
      provider,
      view: `providers::${provider}/${provider}`,
    });
    return res.send(html);
  });
};
