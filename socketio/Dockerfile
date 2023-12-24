# Use a lightweight base image
FROM python:3.9-alpine

# Install system dependencies
RUN apk update && \
    apk add --no-cache nginx

# Set the working directory
WORKDIR /app

# Copy only the necessary files
COPY requirements.txt .

# Create and activate the virtual environment
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Upgrade pip and install dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    pip install gunicorn gevent-websocket

# Expose port 80 for Nginx
EXPOSE 80

# Copy the application code
COPY . .

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Run Gunicorn and Nginx
CMD ["sh", "-c", "gunicorn -k geventwebsocket.gunicorn.workers.GeventWebSocketWorker -w 1 -b 0.0.0.0:5004 main:app & nginx -g 'daemon off;'"]
