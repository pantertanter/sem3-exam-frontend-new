#!/usr/bin/env bash

PROJECT_NAME=sem3_exam
DROPLET_URL=kavv.dk
DROPLET_USER=root

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build/* $DROPLET_USER@$DROPLET_URL:/var/www/$PROJECT_NAME