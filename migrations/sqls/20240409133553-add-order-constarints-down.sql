ALTER TABLE IF EXISTS orders
  DROP CONSTRAINT IF EXISTS fk_invoice_id,
  DROP CONSTRAINT IF EXISTS fk_order_status_id,
  DROP CONSTRAINT IF EXISTS fk_details_status_id;
