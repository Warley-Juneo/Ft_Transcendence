FROM postegres:16.2-alpine3.19

RUN mkdir -p /var/lib/postgres/16/data

# Create a directory for custom configuration files
RUN mkdir -p /etc/postgresql/conf.d

# Copy your custom postgres.conf file into the container
COPY postgres.conf /etc/postgresql/conf.d/

# Set the config_file parameter in postgresql.conf to point to your custom postgres.conf file
RUN echo "include_dir = '/etc/postgresql/conf.d/'" >> /usr/local/share/postgresql/postgresql.conf.sample

# Expose PostgreSQL port
EXPOSE 5432
