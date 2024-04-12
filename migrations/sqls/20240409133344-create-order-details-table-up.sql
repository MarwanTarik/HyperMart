CREATE TABLE IF NOT EXISTS order_details(
  order_details_id SERIAL,
  product_id INTEGER, 
  quantity INTEGER,
  order_id INTEGER,
  CONSTRAINT pk_order_details PRIMARY KEY (order_details_id)
);