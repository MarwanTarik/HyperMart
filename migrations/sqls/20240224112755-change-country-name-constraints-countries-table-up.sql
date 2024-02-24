ALTER TABLE countries
ALTER COLUMN name 
SET NOT NULL,
ADD CONSTRAINT unique_country_name UNIQUE (name);