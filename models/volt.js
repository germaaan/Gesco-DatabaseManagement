#!/usr/bin/env nodejs

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
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var util = require('util');
var VoltConfiguration = require('voltjs/lib/configuration');
var VoltClient = require('voltjs/lib/client');
var VoltConstants = require('voltjs/lib/voltconstants');

var client = null;

function eventListener(code, event, message) {
  util.log(util.format( 'Evento %s\tCódigo: %d\tMensaje: %s', event, code,
    message));
}

function getConfiguration() {
  var cfg = new VoltConfiguration();
  cfg.host = "gesco.cloudapp.net";
  cfg.messageQueueSize = 10;

  return cfg;
}

exports.initClient = function() {
  if(client == null) {
    var configs = [];

    configs.push(getConfiguration());
    client = new VoltClient(configs);

    client.on(VoltConstants.SESSION_EVENT.CONNECTION,eventListener);
    client.on(VoltConstants.SESSION_EVENT.CONNECTION_ERROR,eventListener);
    client.on(VoltConstants.SESSION_EVENT.QUERY_RESPONSE_ERROR,eventListener);
    client.on(VoltConstants.SESSION_EVENT.QUERY_DISPATCH_ERROR,eventListener);
    client.on(VoltConstants.SESSION_EVENT.FATAL_ERROR,eventListener);

    client.connect(function startup(code, event,results) {
      util.log('Conexión a base de datos VoltDB realizada correctamente...');
    }, function loginError(code, event, results) {
      util.log('Error al conectar a la base de datos VoltDB.');
    });
  }
}
