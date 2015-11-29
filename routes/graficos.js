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
var _ = require('underscore');
var fs = require('fs');
var router = express.Router();
var client = require(appRoot + '/lib/client');


// GET de la página de gráficos
router.get('/', function(req, res) {
  client.connect(function(err, db) {
    client.exec_sql("ACTOR consultor(tareas) CREATE; SELECT * FROM tareas;", function(err, datos) {
      client.close();

      var stream = fs.createWriteStream(appRoot + '/public/data/data.tsv');
      stream.write("nombre\tfrecuencia\n");
      _.each(datos.rows, function(valor) {
        stream.write(valor.nombre + "\t" + valor.frecuencia + "\n");
      });
      stream.end();

      res.render('graficos', {
        title: 'Gesco-DatabaseManagement: Graficos'
      });
    });
  });
});

module.exports = router;
