/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS Attachments (
  attachment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS Categories (
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Products (
  product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50),
  price_per_unit DECIMAL(10, 2),
  unit VARCHAR(20),
  description TEXT,
  category_id INT,
  attachment_id UUID,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id),
  FOREIGN KEY (attachment_id) REFERENCES Attachments(attachment_id)
);

CREATE TABLE IF NOT EXISTS Stocks (
  stock_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID,
  quantity INT,
  created_by UUID,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES Products(product_id),
  FOREIGN KEY (created_by) REFERENCES Users(user_id),
  FOREIGN KEY (updated_by) REFERENCES Users(user_id)
);