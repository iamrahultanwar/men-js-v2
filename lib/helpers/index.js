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
      return getFileFromDir(
        path.join(appRoot.path, "mappings"),
        `${model}.json`
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
  });
  c.service("Locations", (c) => loc);
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
