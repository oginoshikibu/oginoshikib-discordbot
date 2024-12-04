#!/bin/bash

cd oginoshikibu-discordbot || exit
git pull
docker compose stop
docker compose up -d --build
