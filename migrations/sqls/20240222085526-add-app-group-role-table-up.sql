CREATE TABLE IF NOT EXISTS app_group_role (
	group_role_id SERIAL,
	role_id INTEGER,
	group_id INTEGER,
  CONSTRAINT pk_group_role_id PRIMARY KEY (group_role_id)
);
