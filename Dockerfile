FROM node:lts-alpine3.15

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build

ENV PORT 4000

EXPOSE $PORT


CMD [ "npm", "run", "start:dev" ]