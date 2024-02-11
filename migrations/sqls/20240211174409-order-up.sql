/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS ShipmentStatusCodes (
  status_code INT PRIMARY KEY,
  status_name VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS ShipmentStatus (
  shipment_status_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_date TIMESTAMP,
  order_id UUID,
  status_code INT,
  FOREIGN KEY (status_code) REFERENCES ShipmentStatusCodes(status_code)
);

CREATE TABLE IF NOT EXISTS ShoppingCarts (
  shopping_cart_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtotal DECIMAL(10, 2),
  quantity INT,
  user_id UUID,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS ShoppingCartProducts (
  shopping_cart_id UUID,
  product_id UUID,
  PRIMARY KEY (shopping_cart_id, product_id),
  FOREIGN KEY (shopping_cart_id) REFERENCES ShoppingCarts(shopping_cart_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE IF NOT EXISTS Bills (
  bill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_cost DECIMAL(10, 2),
  discount DECIMAL(10, 2),
  total_price DECIMAL(10, 2),
  shopping_cart_id UUID,
  FOREIGN KEY (shopping_cart_id) REFERENCES ShoppingCarts(shopping_cart_id)
);

CREATE TABLE IF NOT EXISTS Orders (
  order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address VARCHAR(50),
  bill_id UUID,
  shipment_status_id UUID,
  user_id UUID,
  FOREIGN KEY (bill_id) REFERENCES Bills(bill_id),
  FOREIGN KEY (shipment_status_id) REFERENCES ShipmentStatus(shipment_status_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
