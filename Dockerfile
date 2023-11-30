FROM --platform=linux/amd64 node:18-alpine
RUN apk add --no-cache clamav
COPY . /app
WORKDIR /app

RUN npm install && npm run build

EXPOSE 8080
ENTRYPOINT node /app/dist/index.js