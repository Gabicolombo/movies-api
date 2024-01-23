FROM node:18.12.1

WORKDIR /usr/src/app

COPY package.json ./

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]

#http://localhost:8080/movies
