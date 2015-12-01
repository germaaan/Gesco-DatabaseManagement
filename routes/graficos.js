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
var fs = require('fs');
var _ = require('underscore');

var router = express.Router();

var client = require(appRoot + '/database/client');

// GET de la página de gráficos
router.get('/', function(req, res) {
  // Conecta a la base de datos
  client.connect(function(err, db) {
    // Ejecuta consulta SQL
    client.exec_sql("ACTOR consultor(tareas) CREATE; SELECT * FROM tareas;", function(err, datos) {
      // Cierra conexión
      client.close();

      // Crea el documento con el origen de datos para la gráfica
      var stream = fs.createWriteStream(appRoot + '/public/data/data.tsv');
      stream.write("nombre\tfrecuencia\n");

      // Añade al origen de datos la información recuperada de la base de datos
      _.each(datos.rows, function(valor) {
        stream.write(valor.nombre + "\t" + valor.frecuencia + "\n");
      });

      // Cierra el flujo al archivo
      stream.end();
    });

    res.render('graficos', {
      title: 'Gesco-DatabaseManagement: Graficos'
    });
  });
});

module.exports = router;
