# Stage 1: Build the React application
FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Stage 2: Setup Nginx to serve the React app
FROM nginx:stable-alpine as production-stage
# Install Certbot and its Nginx plugin
RUN apk add --no-cache certbot certbot-nginx

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY Nginx/s_locator.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY Nginx/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80 443
ENTRYPOINT ["/entrypoint.sh"]
# CMD ["tail", "-f", "/dev/null"]