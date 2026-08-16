FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Set build-time variables (they can be overridden in production container via start script or env if we use something like envsubst, 
# but typically VITE_ vars are injected at build time. For runtime injection, we can use a script).
# For simplicity, we assume VITE_API_BASE_URL is passed during build or we use a relative path / proxy in nginx.
# Railway supports build args.
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
