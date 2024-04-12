DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'shippment_status') THEN
        INSERT INTO shippment_status (status_name, status_code)
        VALUES 
          ('pending', 1),
          ('processing', 2),
          ('shipped', 3),
          ('delivered', 4);
    END IF;
END $$;