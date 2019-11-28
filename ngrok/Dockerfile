FROM python:3.7.5-alpine3.10

LABEL maintainer="xLasercut"

ARG WRK_DIR=/home/ngrok

RUN apk update && apk upgrade \
 && apk -q add curl \
 && apk -q add bash \
 && apk -q add bash-completion \
 && mkdir ${WRK_DIR}

WORKDIR ${WRK_DIR}

COPY . ${WRK_DIR}/.

EXPOSE 4040

CMD ["/bin/bash", "start.sh"]