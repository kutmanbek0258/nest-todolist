SELECT ri.id, ri.quantity, ri.price,
                       ri."productId" AS productid,
                       p.name AS productname
                FROM receipt_item ri
                INNER JOIN product p on p.id = ri."productId"