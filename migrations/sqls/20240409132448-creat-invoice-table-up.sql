CREATE TABLE IF NOT EXISTS invoice (
  invoice_id SERIAL,
  subtotal INTEGER NOT NULL,
  delivary_cost INTEGER NOT NULL,
  discount INTEGER,
  total INTEGER NOT NULL,
  CONSTRAINT pk_invoice_id PRIMARY KEY (invoice_id)
);