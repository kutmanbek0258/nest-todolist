import api from './api';

class DepotService{
    createDepot({name, description, address, companyID, managerID}){
        return api.post('/depot', {
            name,
            description,
            address,
            companyID,
            managerID,
        })
    };

    getAllDepots({take, skip}){
        return api.post('/depot/get-all', { take, skip });
    };

    getDepotById({id}){
        return api.get('/depot/' + id);
    };

    updateDepot({id, name, description, address, companyID, managerID}){
        return api.patch('/depot/' + id, {
            name,
            description,
            companyID,
            managerID,
        });
    };

    deleteDepot({id}){
        return api.delete('/depot/' + id);
    }
}

export default new DepotService();