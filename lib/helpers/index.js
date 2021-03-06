const appRoot = require("app-root-path");
const path = require("path");
const fs = require("fs");

const loadProviders = (c) => {
  const providerPath = path.join(appRoot.path, "providers");
  fs.readdirSync(providerPath).forEach(function (file) {
    const filePath = path.join(appRoot.path, "providers", file);
    require(filePath)(c);
  });
};

const loadPlugins = (c) => {
  const providerPath = path.join(appRoot.path, "plugins");
  fs.readdirSync(providerPath).forEach(function (file) {
    const filePath = path.join(appRoot.path, "plugins", file);
    require(filePath)(c);
  });
};

const loadLocations = (c) => {
  const loc = new Map();
  loc.set("mappings", {
    all: () => {
      return getAllFilesFromDir(path.join(appRoot.path, "mappings"));
    },
    get: (model) => {
      return fs.existsSync(path.join(appRoot.path, "mappings", `${model}.json`))
        ? getFileFromDir(path.join(appRoot.path, "mappings"), `${model}.json`)
        : false;
    },
    update: (model, data) => {
      const jsonData = require(getFileFromDir(
        path.join(appRoot.path, "mappings"),
        `${model}.json`
      ));

      let updatedData = JSON.stringify({ ...data });
      fs.writeFileSync(
        getFileFromDir(path.join(appRoot.path, "mappings"), `${model}.json`),
        updatedData
      );
    },
    create: (model, data) => {
      fs.writeFileSync(
        getFileFromDir(path.join(appRoot.path, "mappings"), `${model}.json`),
        JSON.stringify(data)
      );
    },
    delete: (model) => {
      //  delete mapping
      fs.unlinkSync(
        getFileFromDir(path.join(appRoot.path, "mappings"), `${model}.json`)
      );
    },
  });
  loc.set("controllers", {
    all: () => {
      return getAllFilesFromDir(path.join(appRoot.path, "app", "controllers"));
    },
    get: (controller) => {
      return getFileFromDir(
        path.join(appRoot.path, "app", "controllers"),
        `${controller}.js`
      );
    },
    create: (controller, data) => {
      fs.writeFileSync(
        getFileFromDir(
          path.join(appRoot.path, "app", "controllers"),
          `${controller}.js`
        ),
        data
      );
    },
    delete: (controller) => {
      //  delete controller
      fs.unlinkSync(
        getFileFromDir(
          path.join(appRoot.path, "app", "controllers"),
          `${controller}.js`
        )
      );
    },
  });

  loc.set("models", {
    all: () => {
      return getAllFilesFromDir(path.join(appRoot.path, "app", "models"));
    },
    get: (model) => {
      return getFileFromDir(
        path.join(appRoot.path, "app", "models"),
        `${model}.js`
      );
    },
    create: (model, data) => {
      fs.writeFileSync(
        getFileFromDir(path.join(appRoot.path, "app", "models"), `${model}.js`),
        data
      );
    },

    delete: (model) => {
      //  delete model
      fs.unlinkSync(
        getFileFromDir(path.join(appRoot.path, "app", "models"), `${model}.js`)
      );
    },
  });

  loc.set("providers", {
    all: () => {
      return getAllFilesFromDir(path.join(appRoot.path, "providers")).map(
        (dir) => dir.split("/").pop()
      );
    },
  });

  loc.set("plugins", {
    all: () => {
      return getAllFilesFromDir(path.join(appRoot.path, "plugins")).map((dir) =>
        dir.split("/").pop()
      );
    },
  });

  loc.set("helper", {
    rootPath: appRoot.path,
  });

  c.provider("Locations", function () {
    // this is the service factory.
    this.$get = function (container) {
      return loc;
    };
  });
};

const getAllFilesFromDir = (dirPath) => {
  const paths = [];

  fs.readdirSync(dirPath).forEach(function (file) {
    paths.push(getFileFromDir(dirPath, file));
  });

  return paths;
};

const getFileFromDir = (dirPath, file) => {
  return path.join(dirPath, file);
};
module.exports = { loadProviders, loadPlugins, loadLocations };
