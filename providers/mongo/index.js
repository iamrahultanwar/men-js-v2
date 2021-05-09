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
