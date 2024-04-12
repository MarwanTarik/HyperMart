CREATE TABLE IF NOT EXISTS shippment_status (
  status_code INTEGER,
  status_name VARCHAR(100) NOT NULL UNIQUE,
  CONSTRAINT status_code PRIMARY KEY(status_code)
);