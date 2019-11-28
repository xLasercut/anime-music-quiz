#!/bin/bash

python setup.py

./ngrok http server:3001 --config=./ngrok.yml
