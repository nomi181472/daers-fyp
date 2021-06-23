FROM python:3.7

WORKDIR /app
COPY requirement.txt .
RUN pip install -r requirement.txt 
COPY . .

CMD ["python","main.py"]

