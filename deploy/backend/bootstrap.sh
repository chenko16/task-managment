#!/bin/bash
set -e
if ! [[ -d /var/lib/postgresql/10/main ]]; then
    pg_dropcluster 10 main || true
    pg_createcluster 10 main
fi

service postgresql start

sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = 'tasks'" | grep -q 1 || sudo -u postgres psql -f /opt/init.sql

java -jar /srv/task_management-1.0.jar
