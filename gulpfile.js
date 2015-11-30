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
var shell = require('gulp-shell');

var pkg = require('gulp-packages')(gulp, [
  'concat',
  'docco',
  'env',
  'install',
  'istanbul',
  'jshint',
  'mocha',
  'nodemon',
  'rename',
  'sass',
  'uglify'
]);

var json = './bower.json';
var main = ['app.js', 'routes/*.js'];
var test = ['app.js', 'routes/*.js', 'lib/*.js'];
var all = ['app.js', 'routes/*.js', 'lib/*.js', 'test/test.js', 'public/js/*.js'];
var style = './public/style/scss/*.scss';

var testing = false;

// // Finaliza la ejecución una vez la tarea ha sido terminada
gulp.on('stop', function() {
  if (testing) {
    process.nextTick(function() {
      process.exit(0);
    });
  }
});

// Instala todos los paquetes necesarios con NPM y Bower
gulp.task('bower', function() {
  return gulp.src(json)
    .pipe(pkg.install());
});

// Comprobación sintáctica del código
gulp.task('lint', function() {
  return gulp.src(all)
    .pipe(pkg.jshint())
    .pipe(pkg.jshint.reporter('default'));
});

// Ejecución de test de cobertura
gulp.task('pre-test', function() {
  return gulp.src(test)
    .pipe(pkg.istanbul())
    .pipe(pkg.istanbul.hookRequire());
});

// Ejecución de test unitarios
gulp.task('test', ['lint', 'pre-test'], function() {
  testing = true;
  return gulp.src(['test/test.js'])
    .pipe(pkg.mocha())
    .pipe(pkg.istanbul.writeReports())
}, ['stop']);

// Compila los scripts de las hojas de estilo
gulp.task('sass', function() {
  gulp.src(style)
    .pipe(pkg.sass())
    .pipe(gulp.dest('./public/style/css'));
});

// Concatena y minifica los archivos JS
gulp.task('js', function() {
  return gulp.src(main)
    .pipe(pkg.concat('app.all.js'))
    .pipe(gulp.dest('./'))
    .pipe(pkg.rename('app.min.js'))
    .pipe(pkg.uglify())
    .pipe(gulp.dest('./'));
});

// Genera documentación
gulp.task('doc', function() {
  return gulp.src(all)
    .pipe(pkg.docco())
    .pipe(gulp.dest('./doc'));
});

// Observa los archivos pendiente de cambios
gulp.task('watch', function() {
  gulp.watch(style, ['sass']);
  gulp.watch(main, ['build']);
});

// Tarea por defecto (métodos de generación)
gulp.task('default', ['bower', 'sass', 'js', 'doc']);

// Ejecuta la aplicación con nodemon en modo desarrollo
gulp.task('dev', ['default'], function() {
  pkg.nodemon({
      script: 'app.min',
      ext: 'js html',
      env: {
        'NODE_ENV': 'development',
        'PORT': 3000,
        'IP': '127.0.0.1'
      }
    })
    .on('restart', function() {
      console.log('Servidor reiniciado...')
    })
});

gulp.task('setProduction', function() {
  pkg.env({
    vars: {
      'NODE_ENV': 'production',
      'PORT': 5000
    }
  });
});

// Ejecuta la aplicación en modo producción
gulp.task('server', ['default', 'setProduction'], shell.task(['node app']));
