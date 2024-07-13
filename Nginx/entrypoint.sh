#!/bin/sh

# Start Nginx
nginx

# Wait for Nginx to start
sleep 5

# If no certificates exist yet, register and obtain a new one
if [ ! -e "/etc/letsencrypt/live/s-locator.northernacs.com/fullchain.pem" ]; then
    certbot --nginx -d s-locator.northernacs.com --non-interactive --agree-tos -m abdulahabbas@northernacs.com --redirect
    
    # Restart Nginx to apply the new configuration
    nginx -s reload
fi

# Keep the container running
tail -f /dev/null