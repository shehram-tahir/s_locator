#!/bin/sh

# # First, try to renew the certificate in case it's near expiration
# certbot renew --nginx --non-interactive

# # If no certificates exist yet, register and obtain a new one
# if [ ! -e "/etc/letsencrypt/live/s-locator.northernacs.com/fullchain.pem" ]; then
#     certbot --nginx -d s-locator.northernacs.com --non-interactive --agree-tos -m abdulahabbas@northernacs.com --redirect
# fi

# Start Nginx in foreground
nginx -g 'daemon off;'
