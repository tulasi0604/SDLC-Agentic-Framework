FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY index.html ./
COPY src ./src
EXPOSE 5173
USER node
CMD ["node", "src/server.js"]
