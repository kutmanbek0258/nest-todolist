import api from './api';

class SupplierService{
    createSupplier({personID, companyID}){
        return api.post('/supplier', {
            personID,
            companyID,
        })
    }

    getAllSuppliers({take, skip}){
        return api.post('/supplier/get-all', {
            take,
            skip,
        })
    }

    getSupplierById({id}){
        return api.get('/supplier/' + id);
    }

    updateSupplier({id, personID, companyID}){
        return api.patch('/supplier/' + id, {
            personID,
            companyID,
        })
    }

    deleteSupplier({id}){
        return api.delete('/supplier/' + id);
    }
}

export default new SupplierService();