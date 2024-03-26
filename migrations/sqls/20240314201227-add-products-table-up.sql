CREATE TABLE IF NOT EXISTS products (
  id SERIAL,
  name VARCHAR(200) NOT NULL,
  price_per_unit INTEGER NOT NULL,
  description VARCHAR(500),
  quantity INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  unit_id INTEGER NOT NULL,
  CONSTRAINT product_pk 
    PRIMARY KEY(id)  
);