FROM node:20-alpine

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./

ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
EXPOSE 3000

RUN npm run build

CMD ["sh", "-c", "npm run start -- -p ${PORT:-3000}"]
