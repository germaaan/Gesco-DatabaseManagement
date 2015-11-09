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
var gulp = require('gulp');

var concat = require('gulp-concat');
var docco = require("gulp-docco");
var install = require('gulp-install');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var json = ['./package.json', './bower.json'];
var main = ['app.js', 'routes/*.js'];
var all = ['app.js', 'routes/*.js', 'lib/*.js', 'test/test.js', 'public/js/*.js'];
var style = './public/style/scss/*.scss';

// Instala todos los paquetes necesarios con NPM y Bower
gulp.task('install', function() {
  return gulp.src(json)
    .pipe(install());
});

// Comprobación sintáctica del código
gulp.task('lint', function() {
  return gulp.src(all)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compila los scripts de las hojas de estilo
gulp.task('sass', function() {
  gulp.src(style)
    .pipe(sass())
    .pipe(gulp.dest('./public/style/css'));
});

// Concatena y minifica los archivos JS
gulp.task('build', function() {
  return gulp.src(main)
    .pipe(concat('app.all.js'))
    .pipe(gulp.dest('./'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

// Genera documentación
gulp.task('doc', function() {
  return gulp.src(all)
    .pipe(docco())
    .pipe(gulp.dest('./doc'));
});

// Observa los archivos pendiente de cambios
gulp.task('watch', function() {
  gulp.watch(style, ['sass']);
  gulp.watch(main, ['build']);
});

// Ejecuta la aplicación con nodemon para reiniciarse ante cualquier cambio
gulp.task('server', function() {
  nodemon({
      script: 'app.min',
      ext: 'js html css',
      env: {
        'NODE_ENV': 'development'
      }
    })
    .on('restart', function() {
      console.log('Servidor reiniciado...')
    })
});

// Tarea por defecto (métodos de generación)
gulp.task('default', ['install', 'sass', 'build', 'doc']);
