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
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/


// Dependencias
var express = require('express');
var http = require('http');
var path = require('path');
var volt = require(__dirname + '/models/volt');

// Rutas
var index = require(__dirname + '/routes/index');
var grafico = require(__dirname + '/routes/grafico');

// Crea aplicación web con Express
var app = express();

// Funcionalidades
app.get('/', index.index);
app.get('/grafico', grafico.grafico);
// app.get('/grafico', graficos.grafico);
// app.get('/grafico', function(req, res) {
//   res.writeHead(200, {
//     'Content-Type': 'text/html'
//   });
//
//   res.write('R graph<br>');
//
//   exec('./public/scripts/prueba.R', function(error, stdout, stderr) {
//     console.log('Salida: ' + stdout);
//     if (error != null) {
//       console.log('Error al generar gráfico: ' + error);
//     }
//
//     res.write('<img src="/prueba.png"/>');
//     res.end('<br>end of R script');
//   });
// });

// Variables de entorno
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '127.0.0.1');
// Directorio con las plantillas
// app.set('views', path.join(__dirname, 'views'));
// Motor de visualización
app.set('view engine', 'jade');

//Favicon
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
//Logger de solicitudes HTTP
app.use(express.logger('dev'));
//Manejador de enrutado
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//Página de error
app.use(function(req, res, next) {
  res.status(404).render('error', {
    mensaje: 'Error 404: Página no encontrada.'
  });
});

// Creación del servidor
http.createServer(app).listen(app.get('port'), app.get('ip'), function() {
  console.log('Servidor Express escuchando en ' + app.get('ip') + ':' + app.get('port'));
});

//volt.ejecutar();
