FROM ubuntu:16.04
RUN apt-get update && apt-get install -y \
	curl \
	python \
	make \
	g++
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update && apt-get install -y \
	nodejs
RUN apt-get install -y build-essential
RUN apt-get install -y apache2-utils
RUN apt-get update && apt-get install -y \
  nginx


RUN mkdir /app
WORKDIR /app
COPY . .

ARG version

RUN npm install
RUN echo $version
RUN version=$version npm run build

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY deploy/nginx-default /etc/nginx/sites-enabled/default
COPY deploy/static/apple-app-site-association /var/www/ios/apple-app-site-association
RUN htpasswd -bc /etc/nginx/.htpasswd admin family
RUN htpasswd -b /etc/nginx/.htpasswd oracle test@oracle

EXPOSE 3002

ENV version $version
CMD ["export version=${version}"]
CMD ["export PORT=3000"]
CMD sh ./deploy/env.sh
CMD sh ./deploy/commands.sh
