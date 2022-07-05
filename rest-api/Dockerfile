FROM node:16-alpine

RUN apk update

WORKDIR /usr/app

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . .
RUN chmod u+x ./wait-util/wait

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "-c", "/usr/app/wait-util/wait && exec $0 \"$@\""]

CMD [ "yarn", "serve" ]