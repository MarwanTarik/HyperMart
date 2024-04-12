ALTER TABLE IF EXISTS orders
  ADD CONSTRAINT fk_invoice_id
    FOREIGN KEY (invoice_id)
    REFERENCES invoice (invoice_id),
  ADD CONSTRAINT fk_order_status_id
    FOREIGN KEY (order_status_id)
    REFERENCES order_status (order_status_id)
    ON DELETE CASCADE;