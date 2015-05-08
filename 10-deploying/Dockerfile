FROM node:0.10.38-slim

ADD . /app

RUN cd /app && npm install --production

CMD [ "node", "/app/server.js" ]
