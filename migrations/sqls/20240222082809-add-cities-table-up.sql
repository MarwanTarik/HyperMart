CREATE TABLE IF NOT EXISTS cities (
  city_id SERIAL,
  name VARCHAR(50),
  CONSTRAINT pk_city_id PRIMARY KEY (city_id)
);
