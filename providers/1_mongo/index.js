const mongodbConnectionString =
  "mongodb+srv://root:root@cluster0.lcb0z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const chalk = require("chalk");
var connected = chalk.bold.green;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

module.exports = function (ctx) {
  const { Database } = ctx;
  connectDatabase(Database);
  loadModels(ctx);
};

const loadModels = (ctx) => {
  let models = new Map();
  const modelsList = ctx.Locations.get("models").all();
  modelsList.forEach(function (filePath) {
    const Locations = ctx.Locations;
    const modelName = filePath.split("/").pop().toString().replace(".js", "");
    const json = require(Locations.get("mappings").get(modelName));
    const schemaJson = Object.assign({}, JSON.parse(JSON.stringify(json)));
    const modelSchema = require(filePath)(
      new ctx.Database.Schema(sanitizeModelData(schemaJson, ctx.Database))
    );
    models.set(modelName, new ctx.Database.model(modelName, modelSchema));
  });
  ctx.service("Models", (ctx) => models);
};

const sanitizeModelData = (json, Database) => {
  const returnJson = { ...json };
  Object.keys(returnJson).forEach((key) => {
    if (typeof returnJson[key] === "object") {
      if (returnJson[key].hasOwnProperty("ref")) {
        returnJson[key].type = Database.Schema.Types.ObjectId;
      } else returnJson[key] = sanitizeModelData(returnJson[key], Database);
    }
  });
  return returnJson;
};

const connectDatabase = (Database) => {
  Database.connect(mongodbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  Database.connection.on("connected", function () {
    console.log(connected("Mongoose default connection is open "));
  });

  Database.connection.on("error", function (err) {
    console.log(
      error("Mongoose default connection has occurred " + err + " error")
    );
  });

  Database.connection.on("disconnected", function () {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on("SIGINT", function () {
    Database.connection.close(function () {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });
};
