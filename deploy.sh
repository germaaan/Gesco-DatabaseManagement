#!/bin/bash

apt-get install texlive texlive-lang-spanish
./installDB.sh
npm -g install gulp
gulp server
