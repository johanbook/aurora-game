FROM node:16.5.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ENTRYPOINT [ "npx" ]
CMD [  "ts-node", "./src/application/tcp.ts" ]
EXPOSE 23/tcp
