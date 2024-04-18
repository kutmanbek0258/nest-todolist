CREATE OR REPLACE FUNCTION update_product_quantity() RETURNS TRIGGER AS
$check_update_write_off$
DECLARE
    receipt_sum integer;
    write_off_sum integer;
    totalQuantity integer;
BEGIN

    IF(TG_OP = 'DELETE') THEN
        SELECT SUM(quantity)
        FROM receipt_item
        WHERE "productId" = OLD."productId"
        INTO receipt_sum;


        SELECT SUM(quantity)
        FROM write_off_item
        WHERE "productId" = OLD."productId"
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
        WHERE id = OLD."productId";

        RETURN OLD;
    ELSE
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
    END IF;

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

    IF(TG_OP = 'DELETE') THEN
        SELECT SUM(quantity)
        FROM receipt_item
        WHERE "productId" = OLD."productId"
        INTO receipt_sum;


        SELECT SUM(quantity)
        FROM write_off_item
        WHERE "productId" = OLD."productId"
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

        UPDATE product SET (cost) = (
            SELECT AVG(price) FROM receipt_item
            WHERE receipt_item."productId" = OLD."productId"
        )
        WHERE product.id = OLD."productId";

        UPDATE product SET quantity = totalQuantity
        WHERE id = OLD."productId";

        RETURN OLD;
    ELSE
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

        UPDATE product SET (cost) = (
            SELECT AVG(price) FROM receipt_item
            WHERE receipt_item."productId" = NEW."productId"
        )
        WHERE product.id = NEW."productId";

        UPDATE product SET quantity = totalQuantity
        WHERE id = NEW."productId";

        RETURN NEW;
    END IF;

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
    UPDATE recount_item SET price = p.cost
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

-- SELECT * FROM fill_recount_items_price_by_retail_price(3);
-- SELECT * FROM fill_recount_items_price_by_cost(3);

CREATE OR REPLACE FUNCTION create_and_fill_write_off_document_from_recount(recountId integer, authorId integer) RETURNS int AS $$
DECLARE
    new_write_off_id int;
BEGIN
    IF((SELECT SUM(ri.quantity) FROM recount_item ri WHERE ri.quantity > ri.actual_quantity) > 0) THEN
        INSERT INTO write_off("shopId", "depotId", "createdById", "based_on")
        SELECT recount."depotId", recount."shopId", authorId, recountId
        FROM recount
        WHERE recount.id = recountId
        RETURNING id
            INTO new_write_off_id;

        INSERT INTO write_off_item("writeOffId", "productId", "quantity", "price")
        SELECT new_write_off_id, ri."productId", ri.quantity - ri.actual_quantity, price
        FROM recount_item ri
        WHERE ri."recountId" = recountId AND ri.quantity > ri.actual_quantity;
    ELSE
        RAISE EXCEPTION USING MESSAGE = CONCAT('does not contain rows exceeding the actual quantity');
    END IF;

    RETURN new_write_off_id;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_and_fill_receipt_document_from_recount(recountId integer, authorId integer) RETURNS int AS $$
DECLARE
    new_receipt_id int;
BEGIN
    IF((SELECT SUM(ri.quantity) FROM recount_item ri WHERE ri.quantity < ri.actual_quantity) > 0) THEN
        INSERT INTO receipt("shopId", "depotId", "supplierId", "createdById", "based_on")
        SELECT recount."depotId", recount."shopId", 1, authorId, recountId
        FROM recount
        WHERE recount.id = recountId
        RETURNING id
            INTO new_receipt_id;

        INSERT INTO receipt_item("receiptId", "productId", "quantity", "price")
        SELECT new_receipt_id, ri."productId", ri.actual_quantity - ri.quantity, price
        FROM recount_item ri
        WHERE ri."recountId" = recountId AND ri.quantity < ri.actual_quantity;
    ELSE
        RAISE EXCEPTION USING MESSAGE = CONCAT('does not contain items below the actual quantity');
    END IF;

    RETURN new_receipt_id;
END
$$ LANGUAGE plpgsql;

-- SELECT * FROM create_and_fill_receipt_document_from_recount(2);
-- SELECT * FROM create_and_fill_write_off_document_from_recount(2);

CREATE OR REPLACE FUNCTION update_product_price() RETURNS TRIGGER AS
$check_update_price$
DECLARE
    last_retail_price integer;
BEGIN
    IF(TG_OP = 'DELETE') THEN
        SELECT retail_price FROM price_item
        WHERE "productId" = OLD."productId"
        ORDER BY id DESC
        LIMIT 1 INTO last_retail_price;

        IF NOT FOUND THEN
            RETURN OLD;
        END IF;

        UPDATE product SET price = last_retail_price
        WHERE product.id = OLD."productId";

        RETURN OLD;
    ELSE
        UPDATE product SET price = NEW.retail_price
        WHERE product.id = NEW."productId";

        RETURN NEW;
    END IF;
END
$check_update_price$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_update_price
    AFTER INSERT OR UPDATE OR DELETE ON price_item
    FOR EACH ROW
EXECUTE FUNCTION update_product_price();

CREATE OR REPLACE FUNCTION create_and_fill_price_document_from_receipt(receiptId integer, authorId integer) RETURNS int AS $$
DECLARE
    new_price_id int;
BEGIN

    INSERT INTO price("shopId", "createdById")
        SELECT receipt."shopId", authorId
        FROM receipt
        WHERE receipt.id = receiptId
        RETURNING price.id
            INTO new_price_id;

    INSERT INTO price_item("priceId", "retail_price", "productId")
        SELECT new_price_id,
               (SELECT (ri.price * (pt.formula / 100.0)) + ri.price
                  FROM receipt_item ri
                           INNER JOIN product p on p.id = ri."productId"
                           INNER JOIN price_template pt on pt.id = p."priceTemplateId"
                  WHERE ri.id = receipt_item.id),
               receipt_item."productId"
        FROM receipt_item
        WHERE receipt_item."receiptId" = receiptId;

    RETURN new_price_id;
END
$$ LANGUAGE plpgsql;

-- SELECT * FROM create_and_fill_price_document_from_receipt(1, 1);