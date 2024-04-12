DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shippment_status') THEN
        DELETE 
          FROM shippment_status 
          WHERE status_code IN (1, 2, 3, 4);
    END IF;
END $$;