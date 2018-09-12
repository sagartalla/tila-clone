FROM mhart/alpine-node

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3002
CMD ["npm", "start"]
