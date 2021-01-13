FROM ubuntu:bionic

RUN apt-get -qq update
RUN apt-get -qq -y install openjdk-11-jdk maven postgresql-10 sudo
COPY bootstrap.sh /root
COPY init.sql /opt
ENTRYPOINT /root/bootstrap.sh

