
FROM node:20-alpine AS build-step
WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .
RUN npm run build --configuration=production


FROM nginx:stable-alpine
COPY --from=build-step /app/dist/labconnect-frontend/browser /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]