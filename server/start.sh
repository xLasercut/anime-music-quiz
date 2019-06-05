#!/bin/bash

head -n 3 ./ngrok/ngrok.yml > ./ngrok/ngrok_run.yml

if [[ ! -z $NGROK_TOKEN ]]; then
  echo "authtoken: $NGROK_TOKEN" >> ./ngrok/ngrok_run.yml
fi

nohup npm run start > /dev/null 2>&1 &
./ngrok/ngrok http 3001 --config=./ngrok/ngrok_run.yml