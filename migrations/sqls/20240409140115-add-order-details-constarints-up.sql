ALTER TABLE IF EXISTS order_details 
  ADD CONSTRAINT fk_product_details_id
    FOREIGN KEY (product_id)
    REFERENCES products(id),
  ADD CONSTRAINT fk_order_details_order_id
    FOREIGN KEY (order_id)
    REFERENCES orders(order_id);