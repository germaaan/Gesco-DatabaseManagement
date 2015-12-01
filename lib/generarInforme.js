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
var lxDocument = require('lx-pdf')('lib/template.json');
var moment = require('moment');
var _ = require('underscore');

exports.generar = function(datos) {
  var cliente = "CLIENTE: Germán Martínez Maldonado";
  var fecha = moment().format("MMMM Do YYYY, h:mm:ss a");
  var asunto = "Informe de frecuencias";
  var contenido = "";

  _.each(datos, function(valor) {
    contenido += "· " + valor.nombre + ": " + valor.frecuencia + "\n";
  });

  lxDocument.addContent('cliente', cliente);
  lxDocument.addContent('fecha', fecha);
  lxDocument.addContent('asunto', asunto);
  lxDocument.addContent('contenido', contenido);

  lxDocument.save('public/data/gesco.pdf', function(result) {});
};
