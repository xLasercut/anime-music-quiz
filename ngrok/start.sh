#!/bin/bash

echo "web_addr: 0.0.0.0:4040" > ./ngrok.yml
echo "region: eu" >> ./ngrok.yml

if [[ ! -z $NGROK_TOKEN ]]; then
  echo "authtoken: $NGROK_TOKEN" >> ./ngrok.yml
fi

./ngrok http server:3001 --config=./ngrok.yml