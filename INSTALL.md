# Instrucciones para la instalación
Antes de nada lo primero es instalar `git` y el paquete `build-essential`

```
sudo apt-get git build-essential
```

## Node.js

```
git clone https://github.com/tj/n.git
cd n
sudo make install
sudo n 0.11.6
sudo n 0.12.7
```

## VoltDB
La instalación de VoltDB solo está comprobada en el sistema operativo Ubuntu 14.04.3 LTS, solo consiguiendo que funcione en una versión Server para máquinas virtuales de Microsoft Azure (b39f27a8b8c64d52b05eac6a62ebad85__Ubuntu-14_04_3-LTS-amd64-server-20151020-en-us-30GB) y una caja con la versión Cloud para Vagrant ([http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box](http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box)).

### Instalación

```
sudo apt-get update && sudo apt-get dist-upgrade

sudo apt-get -y install ant ant-optional apt-show-versions build-essential ccache default-jdk git-arch git-completion git-core git-doc git-email git-svn ntp python python-dev python-httplib2 python-setuptools valgrind

// Solo para Vagrant
sudo dd if=/dev/zero of=/swap bs=1M count=1024
sudo mkswap /swap
sudo swapon /swap

git clone https://github.com/VoltDB/voltdb.git
cd voltdb
ant
```

### Ejecución
En el directorio `voltdb/bin` crear el archivo `deployment.xml`:

```
<?xml version="1.0"?>
<deployment>
   <cluster hostcount="1" />
   <httpd enabled="true">
      <jsonapi enabled="true" />
   </httpd>
</deployment>
```

Añadir las siguientes líneas al archivo `/etc/rc.local`:

```
sudo bash -c "echo never > /sys/kernel/mm/transparent_hugepage/enabled"
sudo bash -c "echo never > /sys/kernel/mm/transparent_hugepage/defrag"
```

Arrancar la base de datos:

```
nohup ~/voltdb/bin/voltdb create -d ~/voltdb/bin/deployment.xml &
```

Comprobar mediante la [API](http://gesco.cloudapp.net:8080/api/1.0/?Procedure=@SystemInformation) que es accesible remotamente.

## TeX Live

```
sudo apt-get install texlive texlive-latex-extra texlive-lang-spanish
```

## R

```
sudo apt-get install libblas3 libcairo2 libgfortran3 libjpeg8 liblapack3 libpango-1.0-0 libpangocairo-1.0-0 libpaper-utils libpaper-utils libssl0.9.8 libtcl8.6 libtiff5 libtk8.6 libxt6 unzip xdg-utils zip

wget https://cran.r-project.org/bin/linux/ubuntu/trusty/r-base-core_3.2.2-1trusty0_amd64.deb -qO temp && sudo dpkg -i temp; rm temp

sudo su - -c "R -e \"install.packages('ggplot2', dependencies=TRUE, repos='http://cran.r-project.org/')\""
```

# Instrucciones para la ejecución

```
npm install --save
npm start
```

Nota: Para comprobar que todas las dependencias se han instalado correctamente:

```
npm list --depth=0
```
