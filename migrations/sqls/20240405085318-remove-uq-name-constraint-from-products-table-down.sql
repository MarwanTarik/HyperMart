DO $$
BEGIN
    IF EXISTS (
      SELECT 1 
      FROM information_schema.tables 
      WHERE table_name = 'products'
    ) THEN
        ALTER TABLE products
        ADD CONSTRAINT uq_name UNIQUE(name);
    END IF;
END $$;
