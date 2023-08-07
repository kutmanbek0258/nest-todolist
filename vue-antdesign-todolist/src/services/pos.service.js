import api from "./api";

class PosService{
    createPos({name, shopID}){
        return api.post('/pos', {
            name,
            shopID,
        })
    }

    getAllPoses({take, skip}){
        return api.post('/pos/get-all', {
            take,
            skip,
        })
    }

    getPosById({id}){
        return api.get('/pos/' + id);
    }

    updatePos({id, name, shopID}){
        return api.patch('/pos/' + id, {
            name,
            shopID,
        })
    }

    deleteShop({id}){
        return api.delete('/pos/' + id);
    }
}

export default new PosService();