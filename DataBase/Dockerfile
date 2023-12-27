FROM python:3.9-alpine

WORKDIR /app
COPY . /app

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

RUN pip install --upgrade pip && \
    pip install -r requirements.txt
	
CMD ["gunicorn", "-w", "1", "-b", "0.0.0.0:5001", "main:app"]



