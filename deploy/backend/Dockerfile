FROM ubuntu:bionic

RUN apt-get -qq update
RUN apt-get -qq -y install wget sudo gnupg
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main" |sudo tee  /etc/apt/sources.list.d/pgdg.list
RUN apt-get -qq update
RUN DEBIAN_FRONTEND="noninteractive" apt-get -qq -y install openjdk-11-jdk maven postgresql-13 postgresql-client-13
COPY bootstrap.sh /root
COPY init.sql /opt
ENTRYPOINT /root/bootstrap.sh

