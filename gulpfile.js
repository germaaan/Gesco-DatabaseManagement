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
var install = require('gulp-install');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
// var browserify = require('browserify');
// var reactify = require('reactify');
// var source = require('vinyl-source-stream');

var json = ['./package.json', './bower.json'];
var scripts = ['app.js', 'models/*.js', 'public/js/src/*.js'];
var estilos = './public/style/scss/*.scss';

gulp.task('install', function() {
  return gulp.src(json)
    .pipe(install());
});

// Compila los componentes React
// gulp.task('js', function() {
//   browserify('./public/js/react/app.jsx')
//     .transform(reactify)
//     .bundle()
//     .pipe(source('app.js'))
//     .pipe(gulp.dest('./public/js/build/'));
// });

// Comprobación sintáctica del código
gulp.task('lint', function() {
  return gulp.src(scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compila los scripts de las hojas de estilo
gulp.task('sass', function() {
  gulp.src(estilos)
    .pipe(sass())
    .pipe(gulp.dest('./public/style/css'));
});

// Concatena y minifica los archivos JS
gulp.task('scripts', function() {
  return gulp.src(scripts)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Observa los archivos pendiente de cambios
gulp.task('watch', function() {
  gulp.watch(scripts, ['lint', 'scripts']);
  gulp.watch(estilos, ['sass']);
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
gulp.task('default', ['install', 'lint', 'sass', 'scripts']);
