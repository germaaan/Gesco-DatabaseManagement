#!/usr/bin/env nodejs

/*
Gesco-DatabaseManagement. Módulo para la gestión de la información de la base de datos de la aplicación Gesco.
Copyright (C) 2015 Germán Martínez Maldonado

This file is part of Gesco-DatabaseManagement.

Gesco-DatabaseManagement is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or any later version.

Gesco-DatabaseManagement is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

// Dependencias
var express = require('express');
var http = require('http');
var volt = require('./models/volt');

// Crea aplicación web con Express
var app = express();

// Inicio
app.get('/', function (req, res) {
  res.send('Hola Mundo!')
})

// Variables de entorno
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '127.0.0.1');

// Creación del servidor
http.createServer(app).listen(app.get('port'), app.get('ip'), function() {
  console.log('Servidor Express escuchando en ' + app.get('ip') + ':' + app.get('port'));
});

volt.initClient();
