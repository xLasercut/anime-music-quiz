FROM node:11.15.0-alpine

LABEL maintainer="xLasercut"

ARG BASE_DIR=/home/amq_server
ARG SERVER_DIR=${BASE_DIR}/server
ARG MODULE_DIR=${BASE_DIR}/shared-modules

RUN apk update && apk upgrade \
 && apk -q add curl \
 && apk -q add bash \
 && apk -q add bash-completion \
 && mkdir ${BASE_DIR} \
 && mkdir ${SERVER_DIR} \
 && mkdir ${MODULE_DIR}

COPY ./server/package.json ${SERVER_DIR}/package.json
COPY ./server/package-lock.json ${SERVER_DIR}/package-lock.json

RUN cd ${SERVER_DIR} && npm ci --production

COPY ./server/ ${SERVER_DIR}/.
COPY ./shared-modules/ ${MODULE_DIR}/.

RUN cd ${SERVER_DIR} && npm run compile

WORKDIR ${SERVER_DIR}

EXPOSE 3001

CMD ["npm", "run", "start"]