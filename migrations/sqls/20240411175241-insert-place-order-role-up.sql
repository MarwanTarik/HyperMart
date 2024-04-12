INSERT INTO app_roles (role_name)
VALUES 
('place_order');

INSERT INTO app_group_role (group_id, role_id)
SELECT 
    (SELECT group_id FROM app_groups WHERE group_name = 'customer'),
    role_id 
FROM 
    app_roles 
WHERE 
    role_name IN ('place_order');