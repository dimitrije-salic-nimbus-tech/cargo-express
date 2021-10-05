FROM node:12.17.0-alpine

WORKDIR /home/node/cargo-api

COPY . .

RUN npm install