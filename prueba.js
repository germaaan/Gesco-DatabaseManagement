#!/usr/bin/env nodejs

var express = require("express"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  debug = require("debug")("Gesco-DatabaseManagement:server"),
  favicon = require("serve-favicon"),
  http = require("http"),
  logger = require("morgan"),
  path = require("path");
global.appRoot = path.resolve(__dirname);
var index = require(__dirname + "/routes/index"),
  graficos = require(__dirname + "/routes/graficos"),
  informes = require(__dirname + "/routes/informes"),
  app = express();
app.set("ip", process.env.IP || "0.0.0.0"), app.set("port", process.env.PORT || 5e3 || 3e3), app.set("views", path.join(__dirname, "views")), app.set("view engine", "jade"), app.use(favicon(__dirname + "/public/images/favicon.ico")), app.use(logger("dev")), app.use(bodyParser.json()), app.use(bodyParser.urlencoded({
  extended: !1
})), app.use(cookieParser()), app.use(express["static"](path.join(__dirname, "public"))), app.use("/", index), app.use("/graficos", graficos), app.use("/informes", informes), app.use(function(e, r, a) {
  var p = new Error("No encontrado.");
  p.status = 404, a(p)
}), app.use(function(e, r, a, p) {
  a.status(e.status), a.render("error", {
    message: e.message,
    error: e
  })
}), app.listen(app.get("port"), app.get("ip"), function() {
  console.log("Aplicación escuchando peticiones para la dirección " + app.get("ip") + " en el puerto " + app.get("port") + " ...")
}), module.exports = app;