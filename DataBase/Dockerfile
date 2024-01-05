FROM python:3.9-alpine

RUN apk update && \
    apk add --no-cache 

WORKDIR /app
COPY . /app

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

RUN pip install gunicorn gevent-websocket

EXPOSE 5001

CMD ["gunicorn", "-w", "1", "-b", "0.0.0.0:5001","-k", "geventwebsocket.gunicorn.workers.GeventWebSocketWorker", "main:app"]