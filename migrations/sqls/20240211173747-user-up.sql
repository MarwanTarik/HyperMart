/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS Cities (
  city_id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Countries (
  country_id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role INT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50) UNIQUE,
  city_id INT,
  country_id INT,
  phone_number VARCHAR(20),
  password_hash VARCHAR(60),
  address VARCHAR(50),
  FOREIGN KEY (city_id) REFERENCES Cities(city_id),
  FOREIGN KEY (country_id) REFERENCES Countries(country_id)
);