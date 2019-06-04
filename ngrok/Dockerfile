FROM alpine:3.9

LABEL maintainer="xLasercut"

ARG WRK_DIR=/home/ngrok

RUN apk update && apk upgrade \
 && apk -q add curl \
 && apk -q add bash \
 && apk -q add bash-completion \
 && mkdir ${WRK_DIR}

WORKDIR ${WRK_DIR}