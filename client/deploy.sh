#!/bin/bash

while getopts ":s: :t: :hn" opt; do
  case ${opt} in
    h )
      echo "Usage:"
      echo "    -h        Display help"
      echo "    -s        Server address (mandatory)"
      echo "    -t        Deployment type: gh or static (default gh)"
      exit 0
      ;;
    s )
      serveraddress=$OPTARG
      ;;
    t )
      deployType=$OPTARG
      ;;
    \? )
      echo -e "${red}Invalid option: $OPTARG${end}" 1>&2
      exit 1
      ;;
    : )
      echo -e "${red}Invalid option: $OPTARG requires an argument${end}" 1>&2
      exit 1
      ;;
  esac
done
shift $((OPTIND -1))

if [[ -z $serveraddress ]]; then
  echo "Server address not supplied"
  exit 1
fi

if [[ -z $deployType ]]; then
  $deployType="gh"
fi

if [[ $deployType = "static" ]]; then
  npm run build

  echo "const AMQ_SERVER = '$serveraddress'" > ./dist/env.js
fi

if [[ $deployType = "gh" ]]; then
  #build
  npm run build:gh

  echo "const AMQ_SERVER = '$serveraddress'" > ./dist/env.js

  cd dist

  git init
  git add -A
  git commit -m "deploy"

  git push -f git@github.com:xLasercut/anime-music-quiz.git master:gh-pages

  cd -
fi