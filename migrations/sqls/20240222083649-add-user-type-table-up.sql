CREATE TABLE IF NOT EXISTS user_type (
	type_id SERIAL,
	type_name VARCHAR(20) UNIQUE NOT NULL,
  CONSTRAINT pk_type_id PRIMARY KEY (type_id)
);