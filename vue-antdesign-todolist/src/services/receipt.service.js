import api from './api';

class ReceiptService {
    createReceipt({supplierID, shopID, depotID}){
        return api.post('/receipt', {
            supplierID,
            shopID,
            depotID
        })
    }

    getAllReceipts({take, skip}){
        return api.post('/receipt/get-all', {
            take,
            skip
        })
    }

    getReceiptById({id}){
        return api.get('/receipt/' + id);
    }

    updateReceipt({id, supplierID, shopID, depotID}){
        return api.patch('/receipt/' + id, {
            supplierID,
            shopID,
            depotID
        })
    }

    deleteReceipt({id}){
        return api.delete('/receipt/' + id);
    }

    addReceiptItem({receiptID, productID, quantity, price}){
        return api.post('/receipt/add-item', {
            receiptID,
            productID,
            quantity,
            price
        })
    }

    getAllReceiptItems({receiptID, sortBy, order}){
        return api.post('/receipt/get-all-items/' + receiptID, {
            sortBy,
            order
        });
    }

    updateReceiptItem({itemID, productID, quantity, price}){
        return api.patch('/receipt/update-item/' + itemID, {
            productID,
            quantity,
            price
        })
    }

    deleteReceiptItem({itemID}){
        return api.delete('/receipt/delete-item/' + itemID)
    }
}

export default new ReceiptService();