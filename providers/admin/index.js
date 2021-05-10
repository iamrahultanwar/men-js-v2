module.exports = (ctx) => {
  const { View, Server } = ctx.container;

  Server.get("/", async (req, res) => {
    const html = await View.render("index");
    return res.send(html);
  });
};
