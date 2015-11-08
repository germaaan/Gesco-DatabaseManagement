#!/bin/bash

export COVERALLS_SERVICE_NAME=travis-ci
export COVERALLS_REPO_TOKEN=$1

echo "Servicio de construcción: $COVERALLS_SERVICE_NAME"
echo "Token secreto para Coveralls.io: $COVERALLS_REPO_TOKEN"
