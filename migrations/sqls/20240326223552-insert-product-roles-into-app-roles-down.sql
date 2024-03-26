DELETE FROM app_roles
WHERE role_name IN 
('add_product', 
'search_product',
'update_product_price',
'delete_product',
'get_product')