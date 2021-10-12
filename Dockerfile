FROM node:12.14-alpine

COPY hexo /blog
WORKDIR /blog

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories

RUN apk add --update --no-cache git
RUN npm config set unsafe-perm true \
	&& npm install hexo-cli -g \
  && npm install

EXPOSE 4000

ENTRYPOINT ["hexo", "server"]
