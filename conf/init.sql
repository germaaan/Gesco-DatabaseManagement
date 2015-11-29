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
CREATE TABLE ejecuciones (id INTEGER PRIMARY KEY, tarea TEXT, frecuencia FLOAT)
commit
