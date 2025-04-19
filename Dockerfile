FROM node:18-alpine AS production-builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21-alpine
WORKDIR /app
COPY --from=production-builder /app/dist /app/public
COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
