# Use an official Alpine Linux image as the base
FROM alpine:latest

# Update the package manager and install necessary packages
RUN apk update && apk add --no-cache \
    g++ \
    openjdk11 \
    nodejs \
    npm \
    python3 \
    py3-pip

# Set working directory
WORKDIR /app

# Copy the Flask app and requirements file
COPY . /app

# Install Python dependencies
RUN pip3 install -r requirements.txt

RUN pip3 install gunicorn

# Expose the Flask app port
EXPOSE 5000

# Command to run the Flask app
CMD ["gunicorn", "main:app", "--bind", "0.0.0.0:5000"]
