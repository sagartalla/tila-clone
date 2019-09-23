FROM ubuntu:18.04

ARG CACHEBUST=0


RUN rm /bin/sh && \
	ln -s /bin/bash /bin/sh && \
	mkdir -p /root/.nvm

ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 12.7.0

RUN apt-get update && apt-get install -y \
	curl \
	python \
	make \
	g++ \
	build-essential \
	apache2-utils \
	nginx

RUN apt-get update --fix-missing && \
	apt-get install -y curl python make g++&& \
	##############################################################################
	# Install: nvm, node and npm
	# @see: http://stackoverflow.com/questions/25899912/install-nvm-in-docker
	##############################################################################
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash && \
	source $NVM_DIR/nvm.sh && \
	nvm install $NODE_VERSION && \
	nvm cache clear && \
	apt-get remove -y curl && \
	rm -rf /var/lib/apt/lists/*

ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN whereis node

RUN mkdir /app
WORKDIR /app
COPY . .

RUN npm install
RUN npm install newrelic --no-optional
RUN echo $version
RUN version=$version node --expose-gc --max-old-space-size=14999 ./node_modules/next/dist/bin/next build

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY deploy/nginx-default /etc/nginx/sites-enabled/default
COPY deploy/static/apple-app-site-association /var/www/ios/apple-app-site-association

EXPOSE 3002

ENV version $version
CMD ["export version=${version}"]
CMD ["export PORT=3000"]
CMD sh ./deploy/env.sh
CMD sh ./deploy/commands.sh
