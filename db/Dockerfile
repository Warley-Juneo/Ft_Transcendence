# Use official PostgreSQL image from Docker Hub
FROM postgres:16

# Set environment variables
ENV POSTGRES_USER=myuser \
    POSTGRES_PASSWORD=mypassword \
    POSTGRES_DB=mydb

# Copy SQL script to create user and database
COPY init.sql /docker-entrypoint-initdb.d/

# Set permissions on SQL script
RUN chmod 755 /docker-entrypoint-initdb.d/init.sql

#ENTRYPOINT [ "psql", "-U", "postgres", "-c", "GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;" ]
