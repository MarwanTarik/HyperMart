ALTER TABLE users 
ADD CONSTRAINT fk_type_id FOREIGN KEY (type_id) REFERENCES user_type(type_id);