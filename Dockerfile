FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# setup key and ssh
RUN apk upgrade --update-cache --available && \
    apk add openssh-client && \
    rm -rf /var/cache/apk/*

RUN mkdir /keys && \
	chmod 600 /keys

RUN echo 'StrictHostKeyChecking no ' >> /etc/ssh/ssh_config
RUN echo 'Port 2222 ' >> /etc/ssh/ssh_config
RUN echo 'IdentityFile /keys/id_rsa ' >> /etc/ssh/ssh_config

COPY ./package.json ./package.json
RUN npm install

ENV NODE_ENV=production

COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev"]
