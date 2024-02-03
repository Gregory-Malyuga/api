FROM node:lts-alpine

WORKDIR /src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .