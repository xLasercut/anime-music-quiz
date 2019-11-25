#!/bin/bash

while getopts ":t: :hrd" opt; do
  case ${opt} in
  h)
    echo "Usage:"
    echo "    -h        Display help"
    echo "    -t        deploy type (dev or prod)"
    echo "    -r        Force recreate containers"
    echo "    -d        Start in debug mode"
    exit 0
    ;;
  t)
    type=$OPTARG
    ;;
  d)
    debug=true
    ;;
  r)
    recreate=true
    ;;
  s)
    container=$OPTARG
    ;;
  \?)
    echo -e "Invalid option: $OPTARG" 1>&2
    exit 1
    ;;
  :)
    echo -e "Invalid option: $OPTARG requires an argument" 1>&2
    exit 1
    ;;
  esac
done
shift $((OPTIND - 1))

if [[ -z ${type} || (${type} != "dev" && ${type} != "prod") ]]; then
  echo "Invalid deploy type"
  exit 1
fi

if [[ ${type} == "prod" ]]; then
  cmd="sudo -E docker-compose -f docker-compose-prod.yml up"
else
  cmd="sudo -E docker-compose up"
fi

if [[ ${recreate} == true ]]; then
  cmd+=" --force-recreate"
fi

if [[ ! ${debug} == true ]]; then
  cmd+=" -d"
fi

${cmd}
