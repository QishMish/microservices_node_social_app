FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "/bin/sh","run.sh" ]