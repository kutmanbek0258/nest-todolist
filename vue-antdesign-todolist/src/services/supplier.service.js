import api from './api';

class SupplierService{
    createSupplier({companyID, personID}){
        return api.post('/supplier', {
            companyID,
            personID,
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

    updateSupplier({id, companyID, personID}){
        return api.patch('/supplier/' + id, {
            companyID,
            personID,
        })
    }

    deleteSupplier({id}){
        return api.delete('/supplier/' + id);
    }
}

export default new SupplierService();