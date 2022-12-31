FROM node:15-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN apk update && apk add bash