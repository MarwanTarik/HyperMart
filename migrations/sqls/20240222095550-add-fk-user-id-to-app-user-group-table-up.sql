ALTER TABLE app_user_group
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES users(user_id);