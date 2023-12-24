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

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["sh", "-c", "gunicorn -w 1 -b 0.0.0.0:5001 main:app & nginx -g 'daemon off;'"]
