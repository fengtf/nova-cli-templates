FROM node:22.8-alpine3.19

RUN apk add --no-cache git openssh

ENV TZ=Asia/Shanghai

WORKDIR /usr/app

COPY . /usr/app

RUN npm install -g pnpm

RUN pnpm install

CMD ["pnpm", "run", "start:prod"]

EXPOSE 80
