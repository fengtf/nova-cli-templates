FROM node:22-alpine AS builder

WORKDIR /usr/app

COPY package.json package-lock.json /usr/app/

RUN apk update && apk upgrade && npm ci

ARG CDN_URL_PREFIX BUILD_ENV

COPY . /usr/app

RUN npm run build

FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

LABEL DIST_PATH="/usr/share/nginx/html"

COPY --from=builder /usr/app/dist /usr/share/nginx/html

EXPOSE 80

LABEL maintainer="tengumin@huanqiu.com"