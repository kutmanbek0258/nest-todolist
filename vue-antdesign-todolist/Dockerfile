FROM node:12.22.12
MAINTAINER Kutman Smanov <smanovkutman0258@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
#RUN npm rebuild sharp --update-binary


# Bundle app source
COPY . /usr/src/app

EXPOSE 7001

CMD [ "npm", "run", "serve" ]
