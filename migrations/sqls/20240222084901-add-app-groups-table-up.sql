CREATE TABLE IF NOT EXISTS app_groups (
  group_id SERIAL,
  group_name VARCHAR(50) UNIQUE NOT NULL,
  CONSTRAINT pk_group_id PRIMARY KEY (group_id)
);