import api from './api';

class SalesmanService{

    createSalesman({personID, companyID}){
        return api.post('/salesman', {
            personID,
            companyID,
        })
    }

    getAllSalesmen({take, skip}){
        return api.post('/salesman/get-all', {
            take,
            skip,
        })
    }

    getSalesmanById({id}){
        return api.get('/salesman/' + id);
    }

    updateSalesman({id, personID, companyID}){
        return api.patch('/salesman/' + id, {
            personID,
            companyID,
        })
    }

    deleteSalesman({id}){
        return api.delete('/salesman/' + id);
    }

}

export default new SalesmanService();