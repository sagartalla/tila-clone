FROM mhart/alpine-node

RUN mkdir /app
WORKDIR /app
COPY . .

ARG version

RUN npm install
RUN echo $version
RUN version=$version npm run build

EXPOSE 3002
CMD ["npm", "run", "start:stage"]
