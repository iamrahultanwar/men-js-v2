const fs = require("fs");
const appRoot = require("app-root-path");
const path = require("path");
module.exports = (template) => {
  const data = fs.readFileSync(
    path.join(
      appRoot.path,
      "providers",
      "3_content",
      "mustache",
      "templates",
      `${template}.mustache`
    )
  );

  return data.toString();
};
