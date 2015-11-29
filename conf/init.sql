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
