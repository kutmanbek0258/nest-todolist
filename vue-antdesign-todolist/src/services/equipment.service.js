import api from './api';

class EquipmentService{
    createEquipment({name, description, type}){
        return api.post('/equipment', {
            name,
            description,
            type
        });
    }

    getAllEquipments(){
        return api.get('/equipment/get-all');
    }

    getEquipmentById({id}){
        return api.get('/equipment/' + id);
    }

    updateEquipment({id, name, description, type}){
        return api.put('/equipment' + id, {
            name,
            description,
            type
        });
    }

    removeEquipment({id}){
        return api.delete('/equipment' + id);
    }
}

export default new EquipmentService();