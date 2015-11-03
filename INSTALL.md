# Instrucciones para la instalación

## Node.js

```
git clone https://github.com/tj/n.git
cd n
sudo make install
sudo n 0.11.6
sudo n 0.12.7
```

## VoltDB

La instalación de VoltDB solo está comprobada en el sistema operativo Ubuntu 14.04.3 LTS, solo consiguiendo que funcione en una versión Server para máquinas virtuales de Microsoft Azure (b39f27a8b8c64d52b05eac6a62ebad85__Ubuntu-14_04_3-LTS-amd64-server-20151020-en-us-30GB) y una caja con la versión Cloud para Vagrant (http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box).

### Instalación

```
sudo apt-get update && sudo apt-get dist-upgrade

sudo apt-get -y install ant build-essential ant-optional default-jdk python valgrind ntp ccache git-arch git-completion git-core git-svn git-doc git-email python-httplib2 python-setuptools python-dev apt-show-versions

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
    <cluster hostcount="1" sitesperhost="1" />
    <httpd enabled="true">
        <jsonapi enabled="true" />
    </httpd>
</deployment>
```

Arrancar la base de datos:

```
nohup ./voltdb create -d deployment.xml &
```

Comprobar mediante la [API](http://gesco.cloudapp.net:8080/api/1.0/?Procedure=@SystemInformation) que es accesible remotamente.

## TeX Live

```
sudo apt-get install texlive texlive-latex-extra texlive-lang-spanish
```

## R

Añadir la siguiente línea al archivo `/etc/apt/sources.list`:

```
deb http://cran.es.r-project.org/bin/linux/ubuntu trusty/
```

```
sudo apt-get update
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9
sudo apt-get install r-base
```
