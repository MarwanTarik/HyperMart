ALTER TABLE app_group_role
ADD CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES app_roles(role_id);

ALTER TABLE app_group_role
ADD CONSTRAINT fk_group_id FOREIGN KEY (group_id) REFERENCES app_groups(group_id);