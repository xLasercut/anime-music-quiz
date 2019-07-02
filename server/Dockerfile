FROM node:11.15.0-alpine

LABEL maintainer="xLasercut"

ARG WRK_DIR=/home/amq_server

RUN apk update && apk upgrade \
 && apk -q add curl \
 && apk -q add bash \
 && apk -q add bash-completion \
 && mkdir ${WRK_DIR}

WORKDIR ${WRK_DIR}

COPY package.json ${WRK_DIR}/package.json
COPY package-lock.json ${WRK_DIR}/package-lock.json

RUN npm ci --production

COPY . ${WRK_DIR}/.

EXPOSE 3001

CMD ["npm", "run", "start"]