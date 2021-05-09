const express = require("express");
module.exports = function (ctx) {
  const { Middleware } = ctx.container;
  Middleware.global().set(express.json());
  Middleware.global().set(express.urlencoded({ extended: true }));
};
