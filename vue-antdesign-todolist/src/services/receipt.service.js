import api from "./api";

class ReceiptService{

    createReceipt({user, product, quantity, cell_number}){
        return api.post('/receipt', {
            user,
            product,
            quantity,
            cell_number,
        });
    }

    getAllReceipts({current, pageSize}){
        return api.post('/receipt/get-all', {current, pageSize});
    }

    getReceiptById({id}){
        return api.get('/receipt/' + id);
    }

    updateReceipt({id, user, product, quantity, cell_number}){
        return api.patch('/receipt/' + id, {
            user,
            product,
            quantity,
            cell_number,
        });
    }

    removeReceipt({id}){
        return api.delete('/receipt/' + id);
    }

}

export default new ReceiptService();