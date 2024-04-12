CREATE TABLE IF NOT EXISTS order_status (
  order_status_id SERIAL,
  status_code INTEGER,
  CONSTRAINT pk_order_status_id PRIMARY KEY(order_status_id)
);