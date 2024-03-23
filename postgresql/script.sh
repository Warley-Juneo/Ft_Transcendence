#!/bin/bash

sudo pg_ctl -D /var/lib/postgresql/data -l logfile start

sudo -u postgres psql << _EOF_

ALTER USER postgres PASSWORD 'password';
\q
_EOF_

psql -U postgres << _EOF_

CREATE ROLE myuser SUPERUSER LOGIN PASSWORD 'mypassword';
\q
_EOF_

psql -U myuser PASSWORD 'mypassword' << _EOF_

CREATE DATABASE mydb
\q
_EOF_