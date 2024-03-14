ALTER TABLE products
ADD CONSTRAINT category_product_fk 
    FOREIGN KEY(category_id)
    REFERENCES categories(id),
ADD CONSTRAINT user_product_fk 
    FOREIGN KEY(user_id)
    REFERENCES users(user_id),
ADD CONSTRAINT unit_product_fk 
    FOREIGN KEY(unit_id)
    REFERENCES product_units(id);