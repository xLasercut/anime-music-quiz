#!/bin/bash

validContainerNames=("server" "ngrok")

function checkContainerName () {
  for name in ${validContainerNames[@]}
  do
    if [[ $name == $1 ]]; then
      return 0
    fi
  done

  echo "Invalid container name (valid name: server or ngrok)"
  exit 1
}

while getopts ":s: :hn" opt; do
  case ${opt} in
    h )
      echo "Usage:"
      echo "    -h        Display help"
      echo "    -s        Name of container to build for building single container"
      echo "    -n        Build without using cache"
      exit 0
      ;;
    s )
      container=$OPTARG
      ;;
    n )
      noCache=true
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

command="sudo docker-compose build"

if [[ $noCache = true ]]; then
  command+=" --no-cache"
fi

if [[ -z $container ]]; then
  $command
else
  checkContainerName $container
  $command $container
fi