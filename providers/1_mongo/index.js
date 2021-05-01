const mongodbConnectionString =
  "mongodb://root:root@localhost:27017/menjs?authSource=admin";
const chalk = require("chalk");
var connected = chalk.bold.green;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

const appRoot = require("app-root-path");
const path = require("path");
const fs = require("fs");
const modelsPath = path.join(appRoot.path, "app", "models");

module.exports = function (ctx) {
  const { Database } = ctx;
  connectDatabase(Database);
  loadModels(ctx);
};

const loadModels = (ctx) => {
  let models = new Map();
  fs.readdirSync(modelsPath).forEach(function (file) {
    const filePath = path.join(appRoot.path, "app", "models", file);
    const Locations = ctx.Locations;
    const modelName = file.toString().replace(".js", "");
    const schemaJson = require(Locations.get("mappings").get(modelName));

    const modelSchema = require(filePath)(
      ctx.Database.Schema,
      sanitizeModelData(schemaJson, ctx.Database)
    );
    models.set(modelName, new ctx.Database.model(modelName, modelSchema));
  });
  ctx.service("Models", (ctx) => models);
};

const sanitizeModelData = (json, Database) => {
  Object.keys(json).forEach((key) => {
    if (typeof json[key] === "object") {
      if (json[key].hasOwnProperty("ref")) {
        json[key].type = Database.Schema.Types.ObjectId;
      } else json[key] = sanitizeModelData(json[key], Database);
    }
  });
  return json;
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
