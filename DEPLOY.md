## Despliegue en PaaS
La aplicación está preparada para desplegarse automáticamente en un stack del PaaS `Heroku`. El archivo de configuración de dicho despliegue es el archivo [**Procfile**](Procfile). Se puede acceder a la aplicación desde la dirección [http://gescodbm.herokuapp.com/](http://gescodbm.herokuapp.com/).

El principal motivo de haber elegido este PaaS es por su facilidad para el despliegue de aplicaciones, siendo importante que entre los lenguajes soportados por defecto esté Node.js; esto permite que simplemente con un fichero de configuración (`Procfile`) en una sola línea de texto podemos indicar la orden que debe ejecutarse en el stack para que nuestra aplicación se pueda ejecutar correctamente. También es importante tener en cuenta que la base de datos que usa la aplicación es externa (actualmente se encuentra en una máquina virtual en Azure), por lo que esto no presentará ningún problema a la hora de desplegar la aplicación.

Además, Heroku también da muchas facilidades para realizar el despliegue automático de la aplicación, desde el propio panel de control de Heroku y en un par de pasos podemos crear una configuración para que nuestra aplicación se despliegue en el PaaS cada vez que se realice una construcción de la integración continua correcta. Simplemente desde el panel de control de nuestra aplicación tenemos que conectarla con el repositorio en GitHub de la misma e indicar que cada vez que se pase la integración continua de los cambios realizados en la rama master, estos se desplieguen automáticamente en Heroku.

![pra03_img01.png](https://dl.dropboxusercontent.com/s/abe8zd2fzha40je/pra03_img01.png)

En cuanto al precio, Heroku tiene un plan gratuito que consiste en un stack con 512 MB de RAM y una aplicación web corriendo, solo teniendo como incoveniente que el proceso se pone a "dormir" después de 30 minutos de inactividad (problema que es facilmente solucionable mediante mecanismos de acceso programado). Por todo lo descrito, este PaaS es una muy buena opción para que la aplicación empiece a funcionar en una etapa tan temprana de su desarrollo.

## Despliegue automático
Para probar que se está realizando el despliegue automático de la aplicación se incluyen estas dos capturas de pantalla. La primera es correspondiente a la comprobación de la [integración continua](https://travis-ci.org/Gescosolution/Gesco-DatabaseManagement/builds/94306573) resultante del commit [5d467bd](https://github.com/Gescosolution/Gesco-DatabaseManagement/commit/5d467bd0407b0075aa3bd6fe8744d0a730ebb124).

![pra03_img02.png](https://dl.dropboxusercontent.com/s/ovoxmd9q8ki0cnf/pra03_img02.png)

La segunda imagen corresponde al panel de actividad de la aplicación en Heroku, se puede ver que aparece un mensaje de construcción correcta seguido de otro que informa de que el commit `5d467bd` ha sido desplegado, el mismo por el que se ha ejecutado la integración continua.

![pra03_img03.png](https://dl.dropboxusercontent.com/s/n7gmaf964x9op9r/pra03_img03.png)
