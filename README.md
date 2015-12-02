[![node](https://img.shields.io/badge/node-4.2.2-blue.svg)](https://nodejs.org/en/) [![license](https://img.shields.io/badge/license-GPL%202.0-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html) [![Build Status](https://img.shields.io/travis/Gescosolution/Gesco-DatabaseManagement/master.svg?style=flat&label=Linux%20build)](https://travis-ci.org/Gescosolution/Gesco-DatabaseManagement)

[![Dependency Status](https://img.shields.io/david/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://david-dm.org/Gescosolution/Gesco-DatabaseManagement) [![devDependency Status](https://img.shields.io/david/dev/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://david-dm.org/Gescosolution/Gesco-DatabaseManagement#info=devDependencies) [![Coverage Status](https://img.shields.io/coveralls/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://coveralls.io/r/Gescosolution/Gesco-DatabaseManagement?branch=master)

# Gesco-DatabaseManagement
Módulo para la gestión de información de la base de datos de la aplicación Gesco. Publicado bajo licencia **GNU GENERAL PUBLIC LICENSE Version 2**.

Este proyecto participa en el Certamen de Proyectos Libres de la Universidad de Granada 2015-2016 como parte del proyecto [Gesco](https://github.com/Gescosolution/Gesco). Las bases del mismo se encuentran [aquí](https://docs.google.com/document/d/16UsdUV_XXuPUh-Imz4PSgh-2ES_YaAJpZ8fNrbTVpMA/edit).

Desarrollado por Germán Martínez Maldonado ([@germaaan](https://github.com/germaaan)).

Una descripción extendida del proyecto se puede encontrar en [este archivo](INFO.md).

## Instalación

```
git clone https://github.com/Gescosolution/Gesco-UserManagement.git
Gesco-UserManagement
npm install -g gulp
npm install
```

## Ejecución
### Aplicación
- Modo desarrollo

```
gulp dev
```

- Modo producción

```
gulp server
```

### Acceso
- Si la aplicación está en modo desarrollo se puede acceder desde la dirección [http://localhost:3000/](http://localhost:3000/).
- Si la aplicación está en modo producción se puede acceder desde la dirección [http://localhost:5000/](http://localhost:5000/).

## Despliegue en PaaS
La aplicación está preparada para desplegarse automáticamente en una aplicación del PaaS `Heroku`. El archivo de configuración de dicho despliegue es el archivo [**Procfile**](Procfile). Se puede acceder a la aplicación desde la dirección [http://gescodbm.herokuapp.com/](http://gescodbm.herokuapp.com/).

El principal motivo de haber elegido este PaaS es por su facilidad para el despliegue de aplicaciones, siendo importante que entre los lenguajes soportados por defecto esté Node.js; esto permite que simplemente con un fichero de configuración (`Procfile`) con una sola línea de texto podemos indicar la orden que debe ejecutarse en el stack para que nuestra aplicación se pueda ejecutar correctamente. También es importante tener en cuenta que la base de datos que usa la aplicación es externa (actualmente se encuentra en una máquina virtual en Azure), por lo que esto no presentará ningún problema a la hora de desplegar la aplicación.

Además, también da muchas facilidades para realizar el despliegue automático de la aplicación, desde el propio panel de control de Heroku y en un par de pasos podemos crear una configuración para que nuestra aplicación se despliegue en el PaaS cada que se realice una construcción de la integración continua correcta.

En cuanto al precio, Heroku tiene un plan gratuito que consiste en un stack con 512 MB de RAM y una aplicación web corriendo, solo teniendo como contraparte que el proceso se pone a "dormir" después de 30 minutos de inactividad (problema que es facilmente solucionable mediante mecanismos de acceso programado). Por todo lo descrito, este PaaS es una muy buena opción para que la aplicación empiece a funcionar en una etapa tan temprana de su funcionamiento.

## Estado de la aplicación
El estado actual de la aplicación es el siguiente:
- [Presentación de la información en tablas](http://gescodbm.herokuapp.com/)
- [Presentación de la información en gráficos](http://gescodbm.herokuapp.com/graficos)
- [Presentación de la información en informes](http://gescodbm.herokuapp.com/informes)
