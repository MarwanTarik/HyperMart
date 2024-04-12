CREATE OR REPLACE FUNCTION update_products_quantities(
  product_ids INT[],
  quantities INT[]
)
RETURNS VOID AS $$
DECLARE
  product_id INT;
  required_quantity INT;
BEGIN
  FOR i IN 1..array_length(product_ids, 1) LOOP
    product_id := product_ids[i];
    required_quantity := quantities[i];
    
    UPDATE products
    SET quantity = quantity - required_quantity
    WHERE id = product_id;
    
    -- Select the updated quantity after the update
    SELECT quantity INTO required_quantity FROM products WHERE id = product_id;

    IF required_quantity < 0 THEN
      RAISE EXCEPTION 'There is insufficient product quantity for product ID: %', product_id;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
