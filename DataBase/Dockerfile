FROM python:3.9-alpine

RUN apk update && \
    apk add --no-cache \
    nginx

WORKDIR /app
COPY . /app

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

RUN pip install gunicorn

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["sh", "-c", "gunicorn main:app --bind 127.0.0.1:5001 --workers 10 & nginx -g 'daemon off;'"]