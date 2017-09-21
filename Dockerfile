FROM node:8.4-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

RUN apk update && apk upgrade && \
    apk add --no-cache git

RUN npm install -g yarn

COPY . /src/app

RUN yarn install

# Entrypoint script
RUN cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

# CMD [ "npm", "start" ]
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]