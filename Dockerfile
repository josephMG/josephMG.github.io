FROM node:alpine

COPY . /blog
WORKDIR /blog

RUN apk add --update --no-cache git
RUN npm config set unsafe-perm true \
	&& npm install hexo-cli -g \
  && npm install

EXPOSE 4000

ENTRYPOINT ["hexo", "server", "--debug"]
