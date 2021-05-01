const express = require("express")();
module.exports = function (c) {
  c.service("Server", (c) => express);
};
