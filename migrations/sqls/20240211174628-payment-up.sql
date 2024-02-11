/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS PaymentData (
  payment_data_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_data JSON
);

CREATE TABLE IF NOT EXISTS PaymentTransactions (
  transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_ref UUID DEFAULT gen_random_uuid(),
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  order_id UUID,
  payment_data_id UUID,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id),
  FOREIGN KEY (payment_data_id) REFERENCES PaymentData(payment_data_id)
);

-- Create trigger for stock update time
CREATE OR REPLACE FUNCTION update_stock_updated_on()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_on = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stock_updated_on_trigger
BEFORE UPDATE ON Stocks
FOR EACH ROW
EXECUTE FUNCTION update_stock_updated_on();