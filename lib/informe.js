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
var util = require("util");

var string = [
  "\\documentclass{article}",
  "\\begin{document}",
  "Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis ",
  "in, eum liber hendrerit an. Qui ut wisi vocibus suscipiantur, quo dicit ridens ",
  "inciderint id. Quo mundi lobortis reformidans eu, legimus senserit definiebas ",
  "an eos. Eu sit tincidunt incorrupte definitionem, vis mutat affert percipit cu, ",
  "eirmod consectetuer signiferumque eu per. In usu latine equidem dolores. Quo no ",
  "falli viris intellegam, ut fugit veritus placerat per.",
  "\\end{document}"
].join("\n");

exports.generar = function(){
  latex.parse(string, function(err, readStream) {
    if (err) throw err;

    var writeStream = fs.createWriteStream(__dirname + "/../public/data/lorem_ipsum.pdf");
    util.pump(readStream, writeStream);
  });
}
