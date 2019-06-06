#!/bin/bash

while getopts ":s: :h" opt; do
  case ${opt} in
    h )
      echo "Usage:"
      echo "    -h        Display help"
      echo "    -s        Full server address (mandatory)"
      exit 0
      ;;
    s )
      address=$OPTARG
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

if [[ -z $address ]]; then
  echo "Server address not provided"
  exit 1
fi

echo "SERVER_ADDRESS=$address" > .env.production

#build
npm run build:gh

cd dist

git init
git add -A
git commit -m "deploy"

git push -f git@github.com:xLasercut/anime-music-quiz.git master:gh-pages

cd -