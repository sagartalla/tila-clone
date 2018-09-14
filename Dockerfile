FROM mhart/alpine-node

WORKDIR /app
COPY . .

RUN npm install
RUN echo $(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)
RUN npm run build

EXPOSE 3002
CMD ["npm", "start"]
