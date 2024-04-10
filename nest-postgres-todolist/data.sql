CREATE OR REPLACE FUNCTION update_product_quantity() RETURNS TRIGGER AS
$check_update_write_off$
DECLARE
    receipt_sum integer;
    write_off_sum integer;
    totalQuantity integer;
BEGIN
    SELECT SUM(quantity)
    FROM receipt_item
    WHERE "productId" = NEW."productId"
    INTO receipt_sum;


    SELECT SUM(quantity)
    FROM write_off_item
    WHERE "productId" = NEW."productId"
    INTO write_off_sum;

    IF (receipt_sum IS NULL) THEN
        receipt_sum = 0;
    END IF;

    IF (write_off_sum IS NULL) THEN
        write_off_sum = 0;
    END IF;

    totalQuantity = receipt_sum - write_off_sum;

    IF (write_off_sum > receipt_sum) THEN
        RAISE EXCEPTION USING MESSAGE = CONCAT('the amount of write-offs should not exceed: ', receipt_sum::text, CHR(13),CHR(10), 'current amount: ', write_off_sum::text);
    END IF;

    UPDATE product SET quantity = totalQuantity
    WHERE id = NEW."productId";

    RETURN NEW;
END
$check_update_write_off$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_update_write_off
    AFTER INSERT OR UPDATE OR DELETE ON write_off_item
    FOR EACH ROW
EXECUTE FUNCTION update_product_quantity();

CREATE OR REPLACE FUNCTION update_product_quantity_receipt() RETURNS TRIGGER AS
$check_update_receipt$
DECLARE
    receipt_sum integer;
    write_off_sum integer;
    totalQuantity integer;
BEGIN
    SELECT SUM(quantity)
    FROM receipt_item
    WHERE "productId" = NEW."productId"
    INTO receipt_sum;


    SELECT SUM(quantity)
    FROM write_off_item
    WHERE "productId" = NEW."productId"
    INTO write_off_sum;

    IF (receipt_sum IS NULL) THEN
        receipt_sum = 0;
    END IF;

    IF (write_off_sum IS NULL) THEN
        write_off_sum = 0;
    END IF;

    totalQuantity = receipt_sum - write_off_sum;

    IF (write_off_sum > receipt_sum) THEN
        RAISE EXCEPTION USING MESSAGE = CONCAT('the amount of write-offs should not exceed: ', receipt_sum::text, CHR(13),CHR(10), 'current amount: ', write_off_sum::text);
    END IF;

    UPDATE product SET quantity = totalQuantity
    WHERE id = NEW."productId";

    RETURN NEW;
END
$check_update_receipt$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_update_receipt
    AFTER INSERT OR UPDATE OR DELETE ON receipt_item
    FOR EACH ROW
EXECUTE FUNCTION update_product_quantity_receipt();

CREATE OR REPLACE FUNCTION fill_recount_items_accounting_quantity(recountId integer) RETURNS TABLE (
    id int,
    productid int,
    productname varchar,
    quantity int,
    actual_quantity int,
    price int) AS $$
BEGIN
    DELETE FROM recount_item
    WHERE "recountId" = "recountId";

    INSERT INTO recount_item ("recountId", "productId", "quantity")
    SELECT recountId, p.id, p.quantity
    FROM product p
    WHERE p.quantity > 0;

    RETURN QUERY
        SELECT ri.id,
               ri."productId" AS productid, p.name AS productname,
               ri.quantity, ri.actual_quantity, ri.price
        FROM recount_item ri
                 INNER JOIN product p on p.id = ri."productId"
        WHERE ri."recountId" = recountId;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fill_recount_items_actual_quantity_by_accounting_quantity(recountId integer) RETURNS TABLE (
    id int,
    productid int,
    productname varchar,
    quantity int,
    actual_quantity int,
    price int) AS $$
BEGIN
    DELETE FROM recount_item
    WHERE "recountId" = "recountId";

    INSERT INTO recount_item ("recountId", "productId", quantity, actual_quantity)
    SELECT recountId, p.id, p.quantity, p.quantity
    FROM product p
    WHERE p.quantity > 0;

    RETURN QUERY
        SELECT ri.id,
               ri."productId" AS productid, p.name AS productname,
               ri.quantity, ri.actual_quantity, ri.price
        FROM recount_item ri
                 INNER JOIN product p on p.id = ri."productId"
        WHERE ri."recountId" = recountId;
END
$$ LANGUAGE plpgsql;

-- SELECT * FROM fill_recount_items_accounting_quantity(3);
-- SELECT * FROM fill_recount_items_actual_quantity_by_accounting_quantity(3);

CREATE OR REPLACE FUNCTION fill_recount_items_price_by_retail_price(recountId integer) RETURNS TABLE (
                                                                                                         id int,
                                                                                                         productid int,
                                                                                                         productname varchar,
                                                                                                         quantity int,
                                                                                                         actual_quantity int,
                                                                                                         price int) AS $$
BEGIN
    UPDATE recount_item SET price = p.price
    FROM product p
    WHERE p.id = recount_item."productId" AND recount_item."recountId" = recountId;

    RETURN QUERY
        SELECT ri.id,
               ri."productId" AS productid, p.name AS productname,
               ri.quantity, ri.actual_quantity, ri.price
        FROM recount_item ri
                 INNER JOIN product p on p.id = ri."productId"
        WHERE ri."recountId" = recountId;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fill_recount_items_price_by_cost(recountId integer) RETURNS TABLE (
                                                                                                 id int,
                                                                                                 productid int,
                                                                                                 productname varchar,
                                                                                                 quantity int,
                                                                                                 actual_quantity int,
                                                                                                 price int) AS $$
BEGIN
    UPDATE recount_item SET price = ri.price
    FROM receipt_item ri
    WHERE ri."productId" = recount_item."productId" AND recount_item."recountId" = recountId;

    RETURN QUERY
        SELECT ri.id,
               ri."productId" AS productid, p.name AS productname,
               ri.quantity, ri.actual_quantity, ri.price
        FROM recount_item ri
                 INNER JOIN product p on p.id = ri."productId"
        WHERE ri."recountId" = recountId;
END
$$ LANGUAGE plpgsql;

-- SELECT * FROM fill_recount_items_price_by_retail_price(3);
-- SELECT * FROM fill_recount_items_price_by_cost(3);