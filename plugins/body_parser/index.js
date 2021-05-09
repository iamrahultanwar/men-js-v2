const express = require("express");
module.exports = function (ctx) {
  const { Middleware } = ctx;
  Middleware.global.set(express.json());
  Middleware.global.set(express.urlencoded({ extended: true }));
};
