FROM node:18.12.1

WORKDIR /usr/src/app

COPY package.json ./

COPY . .

RUN npm install

CMD ["npm", "start"]
