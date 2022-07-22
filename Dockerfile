FROM node:lts

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 4000

EXPOSE $PORT

VOLUME [ "/app/src" ]

CMD [ "npm", "run", "start:dev" ]