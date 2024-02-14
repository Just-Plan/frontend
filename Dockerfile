# Build stage
FROM node:16 AS builder
WORKDIR /frontend
# 현재 디렉토리의 모든 파일을 /frontend로 복사
COPY . .
# 의존성 설치 및 프로젝트 빌드
RUN npm install
RUN npm run build

# Production stage
FROM node:16
WORKDIR /frontend
# 빌더 스테이지에서 생성된 파일을 복사
COPY --from=builder /frontend/next.config.js ./next.config.js
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/node_modules ./node_modules

# 포트 3000 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "run", "start"]
