FROM node:lts-alpine

WORKDIR /home/node
COPY . /home/node
RUN npm install

ENTRYPOINT [ "node", "src" ]