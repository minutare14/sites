FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm AS deps

USER root

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm AS builder

USER root

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm

USER root

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["npm", "run", "start"]
