[![node](https://img.shields.io/badge/node-0.12.7-blue.svg)](https://nodejs.org/en/) [![license](https://img.shields.io/badge/license-GPL%202.0-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html) [![Build Status](https://img.shields.io/travis/Gescosolution/Gesco-DatabaseManagement/master.svg?style=flat&label=Linux%20build)](https://travis-ci.org/Gescosolution/Gesco-DatabaseManagement)

[![Dependency Status](https://img.shields.io/david/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://david-dm.org/Gescosolution/Gesco-DatabaseManagement) [![devDependency Status](https://img.shields.io/david/dev/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://david-dm.org/Gescosolution/Gesco-DatabaseManagement#info=devDependencies) [![Coverage Status](https://img.shields.io/coveralls/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://coveralls.io/r/Gescosolution/Gesco-DatabaseManagement?branch=master)

# Gesco-DatabaseManagement
Módulo para la gestión de información de la base de datos de la aplicación Gesco. Publicado bajo licencia **GNU GENERAL PUBLIC LICENSE Version 2**.

Este proyecto participa en el Certamen de Proyectos Libres de la Universidad de Granada 2015-2016 como parte del proyecto [Gesco](https://github.com/Gescosolution/Gesco). Las bases del mismo se encuentran [aquí](https://docs.google.com/document/d/16UsdUV_XXuPUh-Imz4PSgh-2ES_YaAJpZ8fNrbTVpMA/edit).

Desarrollado por Germán Martínez Maldonado ([@germaaan](https://github.com/germaaan)).

## Descripción
Como parte de la aplicación Gesco, este módulo se encargará de toda la gestión de la información en la base de datos sobre los proyectos que se están llevando a cabo por la empresa del cliente. Esta puede información puede ser referida tanto a los diferentes proyectos que se están llevando a cabo en la empresa del cliente, como las tareas que es necesario gestionar para llevar a cabo esos proyectos o las personas que realizarán las tareas según se les vayan asignando.

También llevará a cabo la presentación de la información que el cliente requiera, para ofrecer esta información de una forma más amigable se generarán informes siguiente una estandarización y también diferentes gráficos para interpretar los datos existentes.

## Motivación
Las bases de datos son muy importantes en cualquier tipo de aplicación, sin embargo uno de los principales problemas de las típicas bases de datos relacionales que usan muchas aplicaciones es que cuando la aplicación crece considerablemente, conseguir esa escalabilidad en la base de datos se puede volver una tarea muy complicada.

Desde un tiempo a esta parte se ha popularizado el uso de bases de datos **NoSQL**, siendo [**MongoDB**](https://github.com/mongodb/mongo) una de las conocidas. Estas bases de datos se basan en usar una escalabilidad horizontal, por lo que no se basa en la idea de que para manejar una base de datos más grande necesitemos un servidor más potente, podemos distribuir la base de datos en varios servidores que funcionen simultáneamente.

Aunque no siempre las bases de datos NoSQL puede que sean la solución. Por una parte, nos encontramos con que los datos no tienen una estructura fija como las tablas, lo que a su vez hace que no se puedan realizar operaciones que permitan directamente combinar los registros de dos o más tablas, en su lugar se suelen usar colecciones de parejas clave-valor; y por otra parte, nos encontramos que tampoco garantizan el conjunto de propiedades **ACID** (**A**tomicity, **C**onsistency, **I**solation y **D**urability: Atomicidad, Consistencia, Aislamiento y Durabilidad en español), por lo que no podemos estar seguros de que todas las transacciones con la base de datos se realicen de forma segura, la motivación de esto último es que se pierde un poco de seguridad, pero se gana un gran rendimiento.

Para intentar solucionar esos problemas, apareció otro tipo de bases de datos: **NewSQL**. Este tipo de base de datos pretenden mantener las garantías ACID de un sistema de datos relacionales, además de conseguir el mismo rendimiento en escalabilidad de las bases de datos NoSQL. Para conseguir esto han cambiado el diseño clásico de las bases de datos relacionales para funcionar en un clúster distribuido en el que cada nodo posee un subconjunto de datos, es un plantamiento similar al de las bases de datos NoSQL: pasar de escalabilidad vertical a escalabilidad horizontal. Otra ventaja, es que además mantiene las estructuras fijas de información y permite el uso de consultas SQL estándar como podemos ver [aquí](https://docs.voltdb.com/tutorial/Part1.php).

El tipo de bases de datos con estructuras fijas es el que mejor se adapta a nuestros requisitos de gestión de información: almacenar diferentes proyectos, tareas de dichos proyectos, miembros de un equipo asignados a esas tareas; todo eso en tablas que se puedan combinar fácilmente para obtener la información de una forma más completa. Además, esta aplicación es una aplicación web orientada a ser desplegada en la nube, la escalabilidad de la base de datos debería ser acorde a la escalabilidad de la aplicación. En conclusión, al juntarse necesidad e innovación el tipo de base datos para el que se desarrollara esta aplicación de gestión será una base de datos NewSQL.

## Procedimiento de realización
Existen tres componentes principales: gestión de la base de datos, generación de los informes y generación de los gráficos. La aplicación es la que se encargará de agrupar esos componentes para que trabajen de forma conjunta.
- Como ya se ha indicado se va a usar una base de datos NewSQL, concretamente [**VoltDB**](https://github.com/VoltDB/voltdb), que es un sistema de gestión de base de datos relacional NewSQL, como ventaja cuenta con que además de tener licencia libre cuenta con una gran cantidad de [documentación en su página web](https://docs.voltdb.com/).
- Para generar los informes con un formato estandarizado se generarán archivos PDF mediante plantillas **LaTeX** con la información que se recupere de la base de datos. Estos PDFs serán generados con la aplicación [**TeX Live**](http://www.tug.org/texlive/), la distribución por defecto de varias distribuciones GNU/Linux como Ubuntu, Debian o Fedora.
- Los gráficos que se generen, que pueden ser incluidos en los informes o ser obtenidos de forma independiente, se generarán mediante [**D3.js**](http://d3js.org/), una librería JavaScript para manipulación de documentos basados en datos.

La aplicación que gestione todo esto es una aplicación web dirigida a la computación en la nube para cuyo desarrollo se usará [**Node.js**](https://github.com/nodejs) (un entorno multiplataforma basado en JavaScript) con un funcionamiento asíncrono y una programación dirigida a eventos, lo que hace que se consiga un gran rendimiento en aplicaciones web además de tener una gran compatibilidad al encontrarse JavaScript en la práctica totalidad de navegadores web. Para las operaciones con la base de datos disponemos de [**este cliente**](https://github.com/VoltDB/voltdb-client-nodejs) creado por los propios desarrolladores de VoltDB, que además también se puede [**instalar desde NPM** ](https://www.npmjs.com/package/voltjs). En el caso de TeX Live el paquete [**gammalatex**](https://www.npmjs.com/package/gammalatex) nos permitirá ejecutar su funcionalidad desde la aplicación, y para D3.js realizaré una librería que sea accedida desde el cliente y que genere los gráficos a partir de archivos TSC con los datos.

Para seguir una metodología de desarrollo continuo **DevOps** se va a emplear un desarrollo basado en pruebas para el que se ejecutarán diversas pruebas unitarias para evaluar que todas las funcionalidades de la aplicación funcionan bajo el comportamiento esperado. También se puede medir el porcentaje de eficacia de nuestras pruebas unitarias pasando un test de cobertura de código, este nos dirá que porcentaje del código de nuestra aplicación está siendo comprobado por las pruebas unitarias desarrolladas. Una vez con las pruebas unitarias desarrolladas y comprobado que son suficientemente completas las usaremos para, incorporando un sistema de integración continua, verificar a cada cambio introducido en el código de la aplicación que este sigue funcionando correctamente y que no se producen errores a raíz de esos cambios. Las soluciones elegidas para cumplir con todo esto son realizar la ejecución de los tests unitarios mediante [**Mocha**](https://github.com/mochajs/mocha) junto con [**Should.js**](https://github.com/shouldjs), el test de cobertura con [**Istanbul**](https://github.com/gotwarlost/istanbul) y la integración continua con [**Travis CI**](https://travis-ci.org/); los primeros son paquetes de Node.js y el último es una plataforma de integración continua libre y con una gran integración con GitHub. La aplicación será construida con [**Gulp**](https://github.com/gulpjs/gulp).

Por último, la aplicación estará preparada para desplegarse en un PaaS como [**Azure**](https://github.com/azure). También se realizará un provisionamiento de software automático con [**Ansible**](https://github.com/ansible/ansible) para instalarle todos los recursos software y efectuar todas las configuraciones necesarias; y un despliegue automático para instalar o actualizar la aplicación en el servidor y probar sus funcionalidades, para eso se puede usar [**Flightplan**](https://github.com/pstadler/flightplan), que es también un paquete disponible para Node.js.

En cuanto a los [hitos](https://github.com/Gescosolution/Gesco-DatabaseManagement/milestones) que se han creado para agrupar todas las tareas del proyecto que se van a ir desarrollando en las diferentes fases son los siguientes:
- **Definición estructura proyecto**: explicación del proyecto en su estado inicial.
- **Instalación herramientas desarrollo**: puesta en marcha de Node.js y el resto de utilidades que se van a utilizar para desarrollar el proyecto.
- **Desarrollo gestión base de datos**: parte de la funcionalidad relacionada con el acceso y la recuperación de datos desde la base de datos.
- **Desarrollo generación PDF**: parte de la funcionalidad relacionada con la generación de los informes en PDF mediante plantillas LaTeX.
- **Desarrollo generación gráficos**: parte de la funcionalidad relacionada con la generación de los gráficos mediante script en R.
- **Creación entorno pruebas**: primeras pruebas unitarias, prueba de cobertura inicial y configuración de la integración continua.
- **Despliegue aplicación**: creación y configuración de las infraestruturas virtuales en las que se va a instalar la aplicación además del despliegue de la aplicación haciendo uso de las mismas.
- **Documentación**: documentación de la instalación y funcionalidad de la aplicación.

Además, están creados los primeros temas para las [tareas más inminentes](https://github.com/Gescosolution/Gesco-DatabaseManagement/issues), aunque seguramente crecerán en número en cuanto comience el desarrollo.

## Relación con la asignatura
La principal relación del proyecto con la asignatura es que como se ha descrito en el apartado anterior, se van a poner en práctica diferentes herramientas que se suelen usar en un desarrollo DevOps y que además iremos viendo durante el temario de la asignatura; estas herramientas son: pruebas unitarias para un desarrollo basado en tests, integración continua, provisionamiento software y despliegue automático. Todo esto hace que de inicio este proyecto cumpla con todos los aspectos necesarios para ser evaluable durante todas las prácticas de la asignatura.

## Sistema de construcción
Como sistema de construcción se ha usado [**Gulp**](http://gulpjs.com/). Es un sistema que permite automatizar tareas de forma fácil, simplemente tenemos que añadirlas como `task` en el `gulpfile.js`; en el interior de estas tareas lo más usual es que las acciones a llevar a cabo se realicen mediante el método `pipe()`, que se basa en el módulo **Stream** de **Node.js** permitiendo una rápida ejecución.

## Paquete para comprobación sintácticas
También comprobamos que el código escrito no tiene errores de sintaxis, estilo o estructural según estándares JavaScript definidos. Para esto todos nuestros script serán analizados por [**JSHint**](http://jshint.com/).

## Paquetes para test unitarios
Para ejecutar test unitarios he escogido [**Mocha**](https://mochajs.org/), debido a que su funcionamiento es simple y flexible, permitiendo fácilmente incluso realizar pruebas sobre tareas asíncronas. Además se integra perfectamente con otras librerías como [**Should.js**](https://github.com/shouldjs/should.js), para realizar pruebas basadas en el comportamiento, y [**SuperTest**](https://github.com/visionmedia/supertest), para realizar pruebas de conexión. En función de lo que queramos testear, escribiremos los test con estas librerias y los ejecutaremos con con Mocha.

Por otra parte para comprobar que tenemos una gran parte de nuestra aplicación testeada, usaremos [**Istanbul**](https://github.com/gotwarlost/istanbul) para conocer exactamente que porcentaje del total del código estamos cubriendo con nuestros tests unitarios. Como puntos a su favor destaca a parte de la fácil integración con Mocha, la detalla salida tanto por terminal como en los archivos HTML que genera.

## Sistema de integración continua
El sistema de integración continua elegido es [**Travis CI**](https://travis-ci.org/), un sistema distribuido de integración continua. Ha sido el elegido por la gran cantidad de lenguajes para los que da soporte, la fácil configuración del mismo y su gran integración con GitHub; todo esto hace que introducir un sistema de integración continua en nuestro proyecto sea algo muy sencillo de llevar a cabo, pero consiguiendo un funcionamiento excepcional. Se puede configurar desde el archivo [`.travis.yml`](.travis.yml).

## Badges en el archivo README
Utilizar badges es un sistema muy visual de hacer llegar determinada información sobre nuestro proyecto de forma llamativa. A parte del badge de [**Travis**](https://img.shields.io/travis/Gescosolution/Gesco-DatabaseManagement/master.svg?style=flat&label=Linux%20build) que indica que el estado actual de nuestro proyecto no presenta ningún error, se han incluido los badges de dos servicios más:
- [**David**](https://david-dm.org/): un servicio que nos informa de si las dependencias de nuestra aplicación están actualizadas o necesitan serlo.
- [**Coveralls**](https://coveralls.io/): este servicio nos dice también el porcentaje del código de nuestra aplicación que está cubierto basándose en la información obtenido de la comprobación realizada por Istanbul.

## Estado de la aplicación
El estado actual de la aplicación es el siguiente:
- Página de inicio temporal ([localhost:3000](https://dl.dropboxusercontent.com/s/o7lcltyqzitxmd9/index.png))
- Página con un gráfico de barras generado cuando se carga la página ([localhost:3000/graficos](https://dl.dropboxusercontent.com/s/fc823d9w9r3kre5/grafico.png))
- Página con un archivo PDF generado cuando se carga la página ([localhost:3000/informe](https://dl.dropboxusercontent.com/s/zowmg9b6e4lhwoz/informe.png))
- [Archivo PDF](https://dl.dropboxusercontent.com/s/wku6nr51ific1jn/pdf.png) generado.

## Ejecución

```
sudo apt-get install texlive
npm install -g gulp
npm install
```

- Si solo queremos construir la aplicación (instalar librerías del navegador, generar CSS, concatenar y minificar scripts y generar la documentación): `gulp`
- Si queremos construir la aplicación y además ejecutarla: `gulp server`
- Si solo queremos ejecutar los test de la aplicación (sintáctico, unitarios y de cobertura): `gulp test`
- [Ejecución de los test](https://dl.dropboxusercontent.com/s/h8m9k246nw3izzu/test.png)
- [Ejecución de la aplicación](https://dl.dropboxusercontent.com/s/jpczzfu0ptw3m60/server.png)
