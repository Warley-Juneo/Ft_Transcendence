#!/bin/bash

# Modifica o arquivo de configuração do PostgreSQL para aceitar conexões externas
sed -i 's/^#listen_addresses = .*/listen_addresses = "*"/' /etc/postgresql/16/main/postgresql.conf

# Modifica o arquivo de configuração pg_hba.conf para autenticação md5
sed -i 's/^\(host.*\)\bident\b/\1md5/' /etc/postgresql/16/main/pg_hba.conf
sed -i 's/^\(local.*\)\bpeer\b/\1trust/' /etc/postgresql/16/main/pg_hba.conf
echo "host all all 0.0.0.0/0 md5" | tee -a /etc/postgresql/16/main/pg_hba.conf

# Reinicia o serviço do PostgreSQL para aplicar as alterações
service postgresql restart

# Cria o usuário postgres e define uma senha
echo "ALTER USER postgres PASSWORD 'password';" | sudo -u postgres psql

# Cria um novo usuário e banco de dados
echo "CREATE ROLE myuser LOGIN PASSWORD 'mypassword';" | sudo -u postgres psql
echo "CREATE DATABASE mydatabase;" | sudo -u postgres psql -U myuser

