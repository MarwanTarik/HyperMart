CREATE TABLE IF NOT EXISTS app_user_group (
	user_group_id SERIAL,
	user_id INTEGER,
	group_id INTEGER,
  CONSTRAINT pk_user_group_id PRIMARY KEY (user_group_id)
);
