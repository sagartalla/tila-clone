FROM mhart/alpine-node

WORKDIR /app
COPY . .

ARG version

RUN npm install
RUN echo $version
RUN version=$version npm run build

EXPOSE 3002
CMD ["npm", "start"]
