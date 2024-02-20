FROM node:18-alpine

WORKDIR /frontend
COPY just-plan/ ./

RUN npm install

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "build"]