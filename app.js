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

var voltdb = require('./lib/volt');

// Rutas
var index = require('./routes/index');
var graficos = require('./routes/graficos');
var informes = require('./routes/informes');

// Crea aplicación web con Express
var app = express();

// Variables de entorno (puerto de escucha y dirección IP)
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '127.0.0.1');
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
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// (PENDIENTE DE TESTEAR PARCIALMENTE)
// Manejador de errores:
// - Modo desarrollo -> imprime mensajes en la pila de errores
// - Modo producción -> no imprime los mensajes de error
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
} else {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

// Creación del servidor
var server = http.createServer(app);
server.listen(app.get('port'));
// server.on('error', onError);
server.on('listening', onListening);

// (PENDIENTE DE TESTEAR)
// Escuchador de eventos para eventos de error en el servidor HTTP
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error('El puerto ' + port + ' requiere privilegios de administrador.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('El puerto ' + port + ' ya está en uso.');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Escuchador de eventos de peticiones al servidor HTTP
function onListening() {
  debug('Servidor Express escuchando localmente en el puerto ' + server.address().port);
  voltdb.ejecutar();
}

module.exports = app;
