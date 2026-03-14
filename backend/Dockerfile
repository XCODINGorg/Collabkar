FROM node:20-alpine

WORKDIR /app/backend

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/ ./

ENV PORT=4001
EXPOSE 4001

CMD ["node", "src/server.js"]

