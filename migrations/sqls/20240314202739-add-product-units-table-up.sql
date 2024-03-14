CREATE TABLE IF NOT EXISTS product_units(
  id SERIAL,
  unit VARCHAR(50) UNIQUE NOT NULL,
  CONSTRAINT product_unit_pk 
    PRIMARY KEY(id)
);