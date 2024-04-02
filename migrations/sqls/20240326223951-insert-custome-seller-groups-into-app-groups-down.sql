DELETE FROM app_user_group
WHERE group_id IN (SELECT group_id FROM app_groups WHERE group_name IN ('customer', 'seller'));

DELETE FROM app_groups 
WHERE group_name IN ('customer', 'seller');