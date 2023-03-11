#!/bin/bash

docker run --restart=always --name depotapp --network=host \
	-e TZ=Europe/Moscow \
	-e PGTZ=Europe/Moscow \
	-p 8080:8080 \
	-v /etc/localtime:/etc/localtime \
	-d depotapp

