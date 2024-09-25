FROM python:3.10

ENV PATH="/scripts:${PATH}"


RUN apt-get update \
    && apt-get install -y binutils libproj-dev gdal-bin


COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /app
COPY . /app
WORKDIR /app
COPY ./scripts /scripts

RUN chmod +x /scripts/*

CMD ["entrypoint.sh"]

