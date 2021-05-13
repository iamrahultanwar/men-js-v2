module.exports = (ctx) => {
  const { View, Server } = ctx.container;

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
