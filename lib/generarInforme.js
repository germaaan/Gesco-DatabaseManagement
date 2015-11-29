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
var fs = require("fs");
var latex = require("gammalatex");
var _ = require("underscore");
var util = require("util");

exports.generar = function(datos) {
  var content = fs.readFileSync(appRoot + "/lib/template.tex", 'utf8');

  _.each(datos, function(valor) {
    content += "\n\t\\item " + valor.nombre + " - " + valor.frecuencia;
  });

  content += "\n\\end{itemize}\n\\end{document}";

  latex.parse(content, function(err, readStream) {
    if (err) throw err;

    var writeStream = fs.createWriteStream(__dirname + "/../public/data/gesco.pdf");
    util.pump(readStream, writeStream);
  });
};