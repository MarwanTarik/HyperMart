DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'uq_name' 
        AND table_name = 'products'
    ) THEN
        ALTER TABLE products
        DROP CONSTRAINT uq_name;
    END IF;
END $$;
