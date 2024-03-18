#Base image
FROM debian:buster

#Step 1. Add PostgreSQL Repository
#First, update the package index and install the necessary packages:
RUN apt update
RUN apt install gnupg2 wget -y

#Second, add the PostgreSQL repository:
RUN apt-get update
RUN apt-get install lsb-release -y
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

#Third, import the repository signing key:
RUN apt install curl -y
RUN curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg

#Finally, update the package list
RUN apt update

#Step 2. Install PostgreSQL 16
#First, install PostgreSQL and its contrib modules:
RUN apt install postgresql-16 postgresql-contrib-16 -y

# Habilitar o serviço PostgreSQL para iniciar automaticamente durante a inicialização do sistema
RUN update-rc.d postgresql enable

#Second, start the PostgreSQL service:
RUN service postgresql start

#Third, enable PostgreSQL service:
#RUN service postgresql enable

#Step 3. Configure PostgreSQL server
#PostgreSQL stores the configuration in the postgresql.conf file. 
COPY ./postgresql.conf /etc/postgresql/16/main/postgresql.conf

#Configure PostgreSQL to use md5 password authentication in the pg_hba.conf file. This is necessary if you want to enable remote connections :
RUN sed -i '/^host/s/ident/md5/' /etc/postgresql/16/main/pg_hba.conf
RUN sed -i '/^local/s/peer/trust/' /etc/postgresql/16/main/pg_hba.conf
RUN echo "host all all 0.0.0.0/0 md5" | tee -a /etc/postgresql/16/main/pg_hba.conf

#Restart PostgreSQL for the changes to take effect:
RUN service postgresql restart

#Allow PostgreSQL port through the firewall:
RUN ufw allow 5432/tcp

#Connect to the PostgreSQL database server
COPY ./script.sh /tmp/

EXPOSE 5432

ENTRYPOINT ["/bin/sh", "/tmp/script.sh"]