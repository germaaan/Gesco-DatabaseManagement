#!/usr/bin/env nodejs

/*
Gesco-DatabaseManagement. Módulo para la gestión de la información de la base
de datos de la aplicación Gesco. Copyright (C) 2015 Germán Martínez Maldonado

This file is part of Gesco-DatabaseManagement.

Gesco-DatabaseManagement is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or any later version.

Gesco-DatabaseManagement is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/


// Dependencias
var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var debug = require('debug')('Gesco-DatabaseManagement:server');
var favicon = require('serve-favicon');
var http = require('http');
var logger = require('morgan');
var path = require('path');
global.appRoot = path.resolve(__dirname);

// Rutas
var index = require(__dirname + '/routes/index');
var graficos = require(__dirname + '/routes/graficos');
var informes = require(__dirname + '/routes/informes');

// Crea aplicación web con Express
var app = express();

// Variables de entorno (puerto de escucha y dirección IP)
app.set('ip', process.env.IP || '0.0.0.0');
app.set('port', process.env.PORT || 5000 || 3000);
// Directorio con las plantillas
app.set('views', path.join(__dirname, 'views'));
// Motor de visualización
app.set('view engine', 'jade');

// Favicon
app.use(favicon(__dirname + '/public/images/favicon.ico'));
// Logger de solicitudes HTTP
app.use(logger('dev'));
// Parseadores
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
//Manejador de enrutado
app.use(express.static(path.join(__dirname, 'public')));

// Funcionalidad
app.use('/', index);
app.use('/graficos', graficos);
app.use('/informes', informes);

// Captura errores 404 y los reenvia al manejador de errores
app.use(function(req, res, next) {
  var err = new Error('No encontrado.');
  err.status = 404;
  next(err);
});

// Manejador de errores:
app.use(function(err, req, res, next) {
  res.status(err.status);
  res.render('error', {
    message: err.message,
    error: err
  });
});

// Servidor escuchando dirección y puertos correspondientes
app.listen(app.get('port'), app.get('ip'), function() {
  console.log('Aplicación escuchando peticiones para la dirección ' + app.get('ip') +
    ' en el puerto ' + app.get('port') + " ...");
});

module.exports = app;
