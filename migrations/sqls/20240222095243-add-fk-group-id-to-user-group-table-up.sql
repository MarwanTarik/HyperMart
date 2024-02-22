ALTER TABLE app_user_group
ADD CONSTRAINT fk_group_id 
FOREIGN KEY (group_id) REFERENCES app_groups(group_id);