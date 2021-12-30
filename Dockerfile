FROM node:current-alpine3.14

WORKDIR /code

ENV PATH /code/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]