import api from './api';

class RecountService {
    createRecount({shopID, depotID}){
        return api.post('/recount', {
            shopID,
            depotID,
        })
    }

    getAllRecounts({take, skip}){
        return api.post('/recount/get-all', {
            take,
            skip
        })
    }

    getRecountByID({id}){
        return api.get('/recount/' + id);
    }

    updateRecount({id, shopID, depotID, status}){
        return api.patch('/recount/' + id, {
            shopID,
            depotID,
            status,
        })
    }

    deleteRecount({id}){
        return api.delete('/recount/' + id);
    }

    addRecountItem({recountID, productID, quantity, actual_quantity, price}){
        return api.post('/recount/add-item', {
            recountID,
            productID,
            quantity,
            actual_quantity,
            price
        })
    }

    fillRecountItemsByAccountingQuantity({recountId}){
        return api.post('/recount/fill-items-by-accounting-qty/' + recountId)
    }

    fillRecountItemsActualQuantityByAccountingQuantity({recountId}){
        return api.post('/recount/fill-items-actual-qty-by-accounting-qty/' + recountId)
    }

    getAllRecountItems({recountID}){
        return api.get('/recount/get-all-items/' + recountID);
    }

    updateRecountItem({itemID, productID, quantity, actual_quantity, price}){
        return api.patch('/recount/update-item/' + itemID, {
            productID,
            quantity,
            actual_quantity,
            price
        })
    }

    deleteRecountItem({itemID}){
        return api.delete('/recount/delete-item/' + itemID)
    }
}

export default new RecountService();