ALTER TABLE IF EXISTS order_status
  ADD CONSTRAINT fk_status_code
    FOREIGN KEY(status_code)
    REFERENCES shippment_status(status_code)
    ON DELETE CASCADE;
