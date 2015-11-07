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
var gulp = require('gulp');

var browserify = require('browserify');
var nodemon = require('gulp-nodemon');
var reactify = require('reactify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

// Genera todos los scripts JavaScript correspondientes a todos los componentes React
gulp.task('js', function() {
  browserify('./public/js/src/app.jsx')
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js/build/'));
});

// Genera todas las hojas de estilo CSS correspondientes a todos los scripts SCSS
gulp.task('sass', function() {
  gulp.src('./public/style/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/style/css'));
});

// Vuelve a generar los archivos cuando cambia algún JSX o SCSS
gulp.task('watch', function() {
  gulp.watch("./public/js/src/**/*.jsx", ["js"])
  gulp.watch("./public/style/scss/*.scss", ["sass"])
});

// Ejecuta la aplicación con nodemon para reiniciarse ante cualquier cambio
gulp.task('server', function() {
  nodemon({
    script: 'app',
    ext: 'js html css',
    env: {
      'DEBUG': 'Gesco-DatabaseManagement'
    }
  })
});

// Tarea por defecto (métodos de generación)
gulp.task('default', ['js', 'sass']);
