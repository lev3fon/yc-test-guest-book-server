FROM node:16-slim

WORKDIR /app
COPY ./package.json ./package.json
#COPY ./tsconfig.json ./tsconfig.json
COPY ./build build
RUN npm install
#RUN npm run build

ENV PORT=3031
ENV DOCUMENT_API_ENDPOINT="https://docapi.serverless.yandexcloud.net/ru-central1/b1gdpjl18f3lnmle6cdu/etn5eirg4nu3m00t3872"
#ENV DATABASE_PATH=

CMD [ "node", "build/index.js" ]
