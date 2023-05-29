FROM node:20

WORKDIR app-node-reborn
COPY . .
EXPOSE 9080
ENTRYPOINT ["node", "index.js"]