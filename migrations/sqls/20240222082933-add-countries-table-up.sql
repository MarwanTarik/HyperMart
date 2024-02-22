CREATE TABLE IF NOT EXISTS countries (
  country_id SERIAL,
  name VARCHAR(50),
  CONSTRAINT pk_countrt_id PRIMARY KEY (country_id)
);
