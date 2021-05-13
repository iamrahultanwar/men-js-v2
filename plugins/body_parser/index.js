const express = require("express");
module.exports = function (ctx) {
  const { Server } = ctx.container;
  Server.use(express.json());
  Server.use(express.urlencoded({ extended: true }));
};
