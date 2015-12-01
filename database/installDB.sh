#!/bin/bash

# Gesco-DatabaseManagement. Módulo para la gestión de la información de la base
# de datos de la aplicación Gesco. Copyright (C) 2015 Germán Martínez Maldonado
#
# This file is part of Gesco-DatabaseManagement.
#
# Gesco-DatabaseManagement is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or any later version.
#
# Gesco-DatabaseManagement is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.


INSTALADO=`dpkg --get-selections | grep actordb | wc -l`

if (( $INSTALADO >= 1 )); then
  echo -e "\nActorDB ya se encuentra instalado en el sistema.\n"
else
  echo -e "\n\nDescargando ActorDB...\n"
  wget "https://s3-eu-west-1.amazonaws.com/biokoda/actordb_0.10.11-1_amd64.deb" -qO temp && sudo dpkg -i temp; rm temp
  echo -e "\n\nArrancando ActorDB...\n"
  actordb start
  echo -e "\n\nInicializando ActorDB...\n"
  actordb_console -f init.sql
fi
