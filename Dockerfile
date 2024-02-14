FROM node:16 AS builder
WORKDIR /frontend
COPY just-plan/ ./

RUN npm install
RUN npm run build

FROM node:16
WORKDIR /frontend
COPY --from=builder /frontend/next.config.js ./next.config.js
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]
