FROM node:16.19.1
MAINTAINER Smanov <smanovkutman0258@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install


# Bundle app source
COPY . /usr/src/app

EXPOSE 7001

RUN npm run migration:run

CMD [ "npm", "run", "start" ]
