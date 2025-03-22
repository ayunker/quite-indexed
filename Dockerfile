FROM lipanski/docker-static-website:latest

# Copy your static files
COPY . .

CMD ["/busybox-httpd", "-f", "-v", "-p", "5174", "-c", "httpd.conf"]
