let Container = require("./lib/index");

const app = Container();

app.Server.listen(1708, () => {
  console.log("Server Started");
});

// console.log(Object.keys(app));
