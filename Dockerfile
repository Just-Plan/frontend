FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:16
WORKDIR /app
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
