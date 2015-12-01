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


-- Crea grupo, nodo y usuario root.
use config
insert into groups values ('grp1','cluster')
insert into nodes values (localnode(),'grp1')
CREATE USER 'root' IDENTIFIED BY 'root'
commit

-- Usuario para escribir y leer datos
CREATE USER 'usuario' IDENTIFIED BY 'usuario'
GRANT read,write ON * to 'usuario'
commit

-- Definimos el esquema de la base de datos
use schema
actor consultor
CREATE TABLE tareas (id INTEGER PRIMARY KEY, nombre TEXT, frecuencia FLOAT)
commit

-- Introducimos los datos de prueba
use actordb
ACTOR consultor(tareas) CREATE;
INSERT INTO tareas (nombre,frecuencia) VALUES ("Atención cliente",0.01267);
INSERT INTO tareas (nombre,frecuencia) VALUES ("Finanzas",0.31413);
INSERT INTO tareas (nombre,frecuencia) VALUES ("Legal",0.16955);
INSERT INTO tareas (nombre,frecuencia) VALUES ("Planificación",0.33579);
INSERT INTO tareas (nombre,frecuencia) VALUES ("Publicidad",0.07251);
INSERT INTO tareas (nombre,frecuencia) VALUES ("Recursos humanos",0.09535);
commit
