FROM node:20-alpine

WORKDIR /app/backend

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/ ./

EXPOSE 10000

CMD ["node", "src/server.js"]
