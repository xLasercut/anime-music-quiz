#!/bin/bash

while getopts ":t: :p: :a: :hrd" opt; do
  case ${opt} in
    h )
      echo "Usage:"
      echo "    -h        Display help"
      echo "    -p        Server password (mandatory)"
      echo "    -a        admin password (mandatory)"
      echo "    -t        ngrok auth token"
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
    p )
      serverpass=$OPTARG
      ;;
    a )
      adminpass=$OPTARG
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

if [[ -z $serverpass ]]; then
  echo "Did not supply server password"
  exit 1
fi

if [[ -z $adminpass ]]; then
  echo "Did not supply admin password"
  exit 1
fi

if [[ ! -z $token ]]; then
  export NGROK_TOKEN=$token
fi

export SERVER_PASSWORD=$serverpass
export ADMIN_PASSWORD=$adminpass

cmd="sudo -E docker-compose up"

if [[ $recreate = true ]]; then
  cmd+=" --force-recreate"
fi

if [[ ! $debug = true ]]; then
  cmd+=" -d"
fi

$cmd