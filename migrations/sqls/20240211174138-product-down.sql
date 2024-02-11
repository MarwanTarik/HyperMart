/* Replace with your SQL commands */
DROP TABLE IF EXISTS Categories CASCADE;
DROP TABLE IF EXISTS Attachments CASCADE;
DROP TABLE IF EXISTS Products CASCADE;
DROP TABLE IF EXISTS Stocks CASCADE;

DROP FUNCTION IF EXISTS update_stock_updated_on();
DROP TRIGGER IF EXISTS update_stock_updated_on_trigger ON Stocks;