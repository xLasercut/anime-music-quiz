#!/bin/bash

while getopts ":t: :hrd" opt; do
  case ${opt} in
    h )
      echo "Usage:"
      echo "    -h        Display help"
      echo "    -t        Dropbox API token (Mandatory)"
      echo "    -r        Force recreate containers"
      echo "    -d        Start in debug mode"
      exit 0
      ;;
    t )
      token=$OPTARG
      ;;
    d )
      debug=true
      ;;
    r )
      recreate=true
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

if [[ ! -z $token ]]; then
  export NGROK_TOKEN=$token
fi

cmd="sudo -E docker-compose up"

if [[ $recreate = true ]]; then
  cmd+=" --force-recreate"
fi

if [[ ! $debug = true ]]; then
  cmd+=" -d"
fi

$cmd