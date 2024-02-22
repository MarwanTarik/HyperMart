CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50) UNIQUE,
  city_id INTEGER,
  country_id INTEGER,
  phone_number VARCHAR(20),
  password_hash VARCHAR(60),
  active VARCHAR(50),
  address VARCHAR(50),
  CONSTRAINT pk_user_id PRIMARY KEY (user_id),
  CONSTRAINT fk_city_id FOREIGN KEY (city_id) REFERENCES Cities(city_id),
  CONSTRAINT fk_country_id FOREIGN KEY (country_id) REFERENCES Countries(country_id)
);