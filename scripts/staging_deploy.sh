#!/bin/bash

cd /home/ubuntu/oginoshikibu-discordbot || exit
/usr/bin/git pull
/usr/bin/docker compose stop
/usr/bin/docker compose up -d --build
