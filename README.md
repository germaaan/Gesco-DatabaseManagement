[![node](https://img.shields.io/badge/node-4.2.2-blue.svg)](https://nodejs.org/en/) [![license](https://img.shields.io/badge/license-GPL%202.0-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html) [![Build Status](https://img.shields.io/travis/Gescosolution/Gesco-DatabaseManagement/master.svg?style=flat&label=Linux%20build)](https://travis-ci.org/Gescosolution/Gesco-DatabaseManagement)

[![Dependency Status](https://img.shields.io/david/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://david-dm.org/Gescosolution/Gesco-DatabaseManagement) [![devDependency Status](https://img.shields.io/david/dev/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://david-dm.org/Gescosolution/Gesco-DatabaseManagement#info=devDependencies) [![Coverage Status](https://img.shields.io/coveralls/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://coveralls.io/r/Gescosolution/Gesco-DatabaseManagement?branch=master)

# Gesco-DatabaseManagement
Módulo para la gestión de información de la base de datos de la aplicación Gesco. Publicado bajo licencia **GNU GENERAL PUBLIC LICENSE Version 2**.

Este proyecto participa en el Certamen de Proyectos Libres de la Universidad de Granada 2015-2016 como parte del proyecto [Gesco](https://github.com/Gescosolution/Gesco). Las bases del mismo se encuentran [aquí](https://docs.google.com/document/d/16UsdUV_XXuPUh-Imz4PSgh-2ES_YaAJpZ8fNrbTVpMA/edit).

Desarrollado por Germán Martínez Maldonado ([@germaaan](https://github.com/germaaan)).

Una descripción extendida del proyecto se puede encontrar en [este archivo](ABOUT.md).

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
La aplicación está preparada para desplegarse automáticamente en una aplicación del PaaS `Heroku`. El archivo de configuración de dicho despliegue es el archivo [**Procfile**](Procfile).

## Estado de la aplicación
El estado actual de la aplicación es el siguiente:
- Página de inicio temporal ([localhost:3000](https://dl.dropboxusercontent.com/s/o7lcltyqzitxmd9/index.png))
- Página con un gráfico de barras generado cuando se carga la página ([localhost:3000/graficos](https://dl.dropboxusercontent.com/s/fc823d9w9r3kre5/grafico.png))
- Página con un archivo PDF generado cuando se carga la página ([localhost:3000/informe](https://dl.dropboxusercontent.com/s/zowmg9b6e4lhwoz/informe.png))
- [Archivo PDF](https://dl.dropboxusercontent.com/s/wku6nr51ific1jn/pdf.png) generado.
