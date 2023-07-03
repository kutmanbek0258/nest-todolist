import api from './api';

class PriceTemplateModule{
    createPriceTemplate({name, description, formula}){
        return api.post('/price-template', {
            name,
            description,
            formula
        })
    }

    getAllPriceTemplates({take, skip}){
        return api.post('/price-template/get-all', {
            take,
            skip
        })
    }

    getPriceTemplateById({id}){
        return api.get('/price-template/' + id);
    }

    updatePriceTemplate({id, name, description, formula}){
        return api.patch('/price-template/' + id, {
            name,
            description,
            formula
        })
    }

    deletePriceTemplate({id}){
        return api.delete('/price-template/' + id);
    }
}