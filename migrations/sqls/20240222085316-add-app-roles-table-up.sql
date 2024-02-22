CREATE TABLE IF NOT EXISTS app_roles (
  role_id SERIAL,
  role_name VARCHAR(50) UNIQUE NOT NULL,
  CONSTRAINT pk_role_id PRIMARY KEY (role_id)
);
