CREATE TABLE IF NOT EXISTS orders (
  order_id SERIAL,
  address VARCHAR(500) NOT NULL,
  shipping_date TIMESTAMP NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  invoice_id INTEGER,
  order_status_id INTEGER,
  CONSTRAINT pk_order_id PRIMARY KEY(order_id)
);