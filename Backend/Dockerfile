FROM python:3.9-alpine

RUN apk update && \
    apk add --no-cache \
    g++ \
    openjdk11 \
    nodejs \
    npm

WORKDIR /app
COPY . /app

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

RUN pip install gunicorn

EXPOSE 5000

CMD ["gunicorn", "main:app", "--bind", "0.0.0.0:5000", "--workers", "1"]
