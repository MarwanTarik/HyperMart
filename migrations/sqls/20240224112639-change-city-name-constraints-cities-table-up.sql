ALTER TABLE cities
ALTER COLUMN name 
SET NOT NULL,
ADD CONSTRAINT unique_city_name UNIQUE (name);