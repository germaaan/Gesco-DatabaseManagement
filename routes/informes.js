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
var router = express.Router();

var client = require(appRoot + '/database/client');
var informe = require(appRoot + '/lib/generarInforme');

// GET de la página de informes
router.get('/', function(req, res) {
  res.render('informes', {
    title: 'Gesco-DatabaseManagement: Informes'
  });

  // Conecta a la base de datos
  client.connect(function(err, db) {
    // Ejecuta consulta SQL
    client.exec_sql("ACTOR consultor(tareas) CREATE; SELECT * FROM tareas;", function(err, datos) {
      // Cierra conexión
      client.close();

      // Genera el informe con la información recuperada
      informe.generar(data.rows);
    });
  });
});

module.exports = router;
