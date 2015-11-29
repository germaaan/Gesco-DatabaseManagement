#!/bin/bash

INSTALADO=`dpkg --get-selections | grep actordb | wc -l`

if (( $INSTALADO >= 1 )); then
  echo -e "\nActorDB ya se encuentra instalado en el sistema.\n"
else
  echo -e "\n\nDescargando ActorDB...\n"
  wget "https://s3-eu-west-1.amazonaws.com/biokoda/actordb_0.10.11-1_amd64.deb" -qO temp && sudo dpkg -i temp; rm temp
  echo -e "\n\nArrancando ActorDB...\n"
  actordb start
  echo -e "\n\nInicializando ActorDB...\n"
  actordb_console -f conf/init.sql
fi
