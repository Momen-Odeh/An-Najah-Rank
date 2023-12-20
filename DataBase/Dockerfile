FROM python:3.9-alpine

RUN apk update && \
    apk add --no-cache \
    nginx \
    supervisor

WORKDIR /app
COPY . /app

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    pip install gunicorn

# Create Supervisor configuration
RUN echo -e "[supervisord]\nnodaemon=true\n\n[program:gunicorn]\ncommand=gunicorn main:app --bind 0.0.0.0:5000 --workers 4\n\n[program:nginx]\ncommand=nginx -g 'daemon off;'" > /etc/supervisord.conf

EXPOSE 80

# Run Supervisor to manage the processes
CMD ["supervisord", "-c", "/etc/supervisord.conf"]
