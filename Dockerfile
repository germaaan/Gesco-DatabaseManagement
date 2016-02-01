# CC-Gesco-DatabaseManagement 1.0

FROM    ubuntu:15.10
MAINTAINER German Martinez <germaaan@gmail.com> Version: 1.0

# Instalar Git y Node.js
RUN apt-get update
RUN apt-get -y install wget
RUN wget -qO- https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y git nodejs

# Clonar el repositorio de la aplicación
RUN git clone https://github.com/Gescosolution/Gesco-DatabaseManagement.git /home/Gesco-DatabaseManagement
WORKDIR "/home/Gesco-DatabaseManagement"

COPY gesco-dm.service /etc/systemd/system

# Desplegar la aplicación
EXPOSE 5000
RUN npm -g install gulp
RUN npm install

# Ejecutar la aplicación
RUN systemctl start gesco-dm
