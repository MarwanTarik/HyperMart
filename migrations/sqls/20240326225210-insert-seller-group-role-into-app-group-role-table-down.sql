DELETE FROM app_group_role
WHERE group_id = (SELECT group_id FROM app_groups WHERE group_name = 'seller')
AND role_id IN 
(SELECT role_id FROM app_roles 
WHERE role_name IN (
      'add_product',
      'delete_product',
      'get_product',
      'update_product_price'
));
