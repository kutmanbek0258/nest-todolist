CREATE OR REPLACE FUNCTION update_product_quantity(product_id int)
    RETURNS int
    LANGUAGE plpgsql
AS
$$
DECLARE
    receipt_sum integer;
    write_off_sum integer;
    totalQuantity integer;
BEGIN
    SELECT SUM(quantity)
    FROM receipt_item
    WHERE "productId" = product_id
    INTO receipt_sum;


    SELECT SUM(quantity)
    FROM write_off_item
    WHERE "productId" = product_id
    INTO write_off_sum;

    IF (receipt_sum IS NULL) THEN
        receipt_sum = 0;
    END IF;

    IF (write_off_sum IS NULL) THEN
        write_off_sum = 0;
    END IF;

    totalQuantity = receipt_sum - write_off_sum;

    IF (write_off_sum > receipt_sum) THEN
        RAISE EXCEPTION USING MESSAGE = CONCAT('the amount of write-offs should not exceed: ', receipt_sum::text);
    END IF;

    UPDATE product SET quantity = totalQuantity
    WHERE id = product_id;

    RETURN totalQuantity;
END
$$;

SELECT update_product_quantity(2);