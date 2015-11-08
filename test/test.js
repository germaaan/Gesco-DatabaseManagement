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
var _ = require("underscore");
var fs = require("fs");
var request = require("supertest");
var should = require("should");

// Módulo de la aplicación
var app = require(__dirname + "/../app.js");

// Método para parsear archivos JSON a objetos JS
var cargar = function(archivo) {
  var config = null;

  try {
    config = JSON.parse(fs.readFileSync(archivo));
  } catch (e) {
    console.log("Error: no existe el archivo " + archivo);
  }

  return config;
};

// Prueba de acceso
describe('Prueba de acceso', function(){
  it("Página de error", function(done){
    request(app)
    .get("/foo")
    .expect(404)
    .end(function(err, res){
      if (err){
        throw err;
      }
      done();
    });
  });
});