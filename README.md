[![node](https://img.shields.io/badge/node-4.2.2-blue.svg)](https://nodejs.org/en/) [![license](https://img.shields.io/badge/license-GPL%202.0-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html) [![Build Status](https://img.shields.io/travis/Gescosolution/Gesco-DatabaseManagement/master.svg?style=flat&label=Linux%20build)](https://travis-ci.org/Gescosolution/Gesco-DatabaseManagement) [![Dependency Status](https://img.shields.io/david/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://david-dm.org/Gescosolution/Gesco-DatabaseManagement) [![devDependency Status](https://img.shields.io/david/dev/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://david-dm.org/Gescosolution/Gesco-DatabaseManagement#info=devDependencies) [![Coverage Status](https://img.shields.io/coveralls/Gescosolution/Gesco-DatabaseManagement.svg?style=flat)](https://coveralls.io/r/Gescosolution/Gesco-DatabaseManagement?branch=master)

[![Heroku](https://www.herokucdn.com/deploy/button.png)](http://gescodbm.herokuapp.com/) [![Docker](https://dl.dropboxusercontent.com/s/s2bk0bksp92rtuq/docker.png)](https://hub.docker.com/r/germaaan/gesco-dbm/) [![Bluemix](https://dl.dropboxusercontent.com/s/hohwfjmewjnrj5h/bluemix.png)](http://gesco-dbm-cc.eu-gb.mybluemix.net/) [![Azure](https://dl.dropboxusercontent.com/s/j84biv6peog6vkc/azure.png)](http://gesco-dbm-cc.cloudapp.net/)

# Gesco-DatabaseManagement
Módulo para la gestión de información de la base de datos de la aplicación Gesco. Publicado bajo licencia **GNU GENERAL PUBLIC LICENSE Version 2**.

Este proyecto participa en el Certamen de Proyectos Libres de la Universidad de Granada 2015-2016 como parte del proyecto [Gesco](https://github.com/Gescosolution/Gesco). Las bases del mismo se encuentran [aquí](https://docs.google.com/document/d/16UsdUV_XXuPUh-Imz4PSgh-2ES_YaAJpZ8fNrbTVpMA/edit).

Desarrollado por Germán Martínez Maldonado ([@germaaan](https://github.com/germaaan)).

Una descripción extendida del proyecto se puede encontrar en [este archivo](INFO.md).

## Instalación

```
git clone https://github.com/Gescosolution/Gesco-UserManagement.git
cd Gesco-UserManagement
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
La aplicación ha sido desplegada también en el PaaS Heroku, la información específica sobre el despliegue se puede encontrar en el archivo [DEPLOY.md](DEPLOY.md).

## Despliegue en contenedores y otras infraestructuras virtualizadas
Además de en Heroku, la aplicación ha sido desplegada en Docker, Azure y Bluemix.

La ventaja de crear un contenedor para una aplicación, es que ese contenedor se convierte en un elemento autocontenido que nos permite desplegar la aplicación fácilmente sin tener que preocuparnos de instalar los recursos o realizar las configuraciones necesarias, todo lo que necesitamos está en el propio contenedor por lo que una vez que descaguemos el contenedor tendremos todo lo que necesitemos para ejecutar la aplicación.

El archivo de configuración de Docker lo podemos encontrar [aquí](Dockerfile); además, ha sido subido al repositorio de contenedores Docker, podemos encontrarlo en [este enlace a Docker Hub](https://hub.docker.com/r/germaaan/gesco-dbm/).

Para usar este contenedor solo tenemos que descargarlo e iniciarlo.

```
docker pull germaaan/gesco-dbm
docker run -i -t -p 5000:5000 germaaan/gesco_dbm
```

![docker1](https://dl.dropboxusercontent.com/s/zxy4e393quqvgyf/docker1.png)

Estando disponible si accedemos a la dirección de acceso a la interfaz de Docker para tener acceso a la red y el puerto 5000.

![docker2](https://dl.dropboxusercontent.com/s/lq2a1h6hok01kak/docker2.png)

También se ha desplegado en la plataforma de IBM, Bluemix, una plataforma de desarrollo híbrido en la nube orientada al desarrollo DevOps, permitiéndonos un fácil despliegue de nuestra aplicación si esta está realizada en un lenguaje de programación que soporte, en cuyo caso solo tendremos que _empujar_ los archivos de nuestra aplicación a una aplicación que creemos en la plataforma.

![bluemix1](https://dl.dropboxusercontent.com/s/3zj4e06rzuntnez/bluemix1.png)

![bluemix2](https://dl.dropboxusercontent.com/s/lsw6gjmwqz8xvff/bluemix2.png)

La aplicación está accesible desde la dirección [http://gesco-dbm-cc.eu-gb.mybluemix.net/](http://gesco-dbm-cc.eu-gb.mybluemix.net/).

Por último, la aplicación también se encuentra disponible en Azure, la plataforma de Microsoft que nos permite crear máquinas virtuales y trabajar con ella como si un ordenar local y físico se tratara. El despliegue en Azure está disponible en la dirección [http://gesco-dbm-cc.cloudapp.net/](http://gesco-dbm-cc.cloudapp.net/).

## Estado de la aplicación
El estado actual de la aplicación es el siguiente:
- [Información en tablas](http://gescodbm.herokuapp.com/): lista la información que se solicita a la base de datos en una tabla.
- [Información en gráficos](http://gescodbm.herokuapp.com/graficos): representa la información que se solicita a la base de datos en un gráfico.
- [Información en documentos](http://gescodbm.herokuapp.com/informes): introduce la información que se solicita a la base de datos en un documento PDF.

El acceso a cada una de esas direcciones hace una petición GET al servidor Express de nuestra aplicación, respondiendo este de la forma adecuada según la programación que le hayamos indicado. En la práctica totalidad de los casos esta respuesta consiste en que se hace una consulta de información a la base de datos y la información obtenida se representa en el navegador de distinta forma en función del servicio solicitado: tabla HTML, gráfico de barras o documento PDF.
