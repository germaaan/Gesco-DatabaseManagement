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

// Módulos de la aplicación
var app = require(__dirname + "/../app");
var informe = require(__dirname + "/../lib/generarInforme");

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

var enlaces = cargar(__dirname + "/../test/enlaces.json");

var datos = {
  nombre: "prueba",
  frecuencia: 0.0
};

// Carga de la aplicación
describe('Aplicación', function() {
  it('Archivo cargado', function() {
    should(app).not.be.null();
  });
});

// Generar informe
describe('Informes', function() {
  it('Generación', function() {
    should(informe.generar(datos)).be.undefined();
  });
});

// Enlaces a comprobar
describe('Enlaces', function() {
  it('Archivo cargado', function() {
    should(enlaces).not.be.null();
  });
  it('Archivo correcto', function() {
    _.each(enlaces, function(valor) {
      var size = _.size(valor);
      should(size).be.exactly(2);
      should(valor).have.property("nombre");
      should(valor).have.property("ruta");
    });
  });
});

// Prueba de acceso a la página
describe('Acceso a la página', function() {
  this.timeout(5000);
  _.each(enlaces, function(valor) {
    it(valor.nombre, function(done) {
      request(app)
        .get(valor.ruta)
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
  it("Error 404", function(done) {
    request(app)
      .get("/foo")
      .expect(404)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
