#!/bin/bash

docker build -t reef-node-v10 .

docker run -d --name=reef-node-v10 -dit -p 30333:30333 -p 9944:9944 -p 9933:9933 reef-node-v10