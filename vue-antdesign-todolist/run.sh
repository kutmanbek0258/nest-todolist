#!/bin/bash

docker run --restart=always --name depotfront --network=host \
	-e TZ=Europe/Moscow \
	-e PGTZ=Europe/Moscow \
	-p 8083:8083 \
	-v /etc/localtime:/etc/localtime \
	-d depotfront
