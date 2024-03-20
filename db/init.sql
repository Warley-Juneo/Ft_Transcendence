-- Grant privileges to create databases
ALTER ROLE myuser CREATEDB;

-- Grant privileges to create and modify schemas
GRANT CREATE ON SCHEMA public TO myuser;
GRANT USAGE ON SCHEMA public TO myuser;

-- Grant privileges to create and modify tables
--GRANT CREATE ON ALL TABLES IN SCHEMA public TO myuser;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO myuser;

-- Grant privileges to create and modify sequences
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO myuser;

-- Grant privileges to create and modify indexes
--GRANT CREATE ON ALL INDEXES IN SCHEMA public TO myuser;