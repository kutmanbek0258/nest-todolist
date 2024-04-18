import api from './api';

class PriceTemplateService{
    createPriceTemplate({name, description, formula}){
        return api.post('/price-template', {
            name,
            description,
            formula: Number(formula),
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
            formula: Number(formula)
        })
    }

    deletePriceTemplate({id}){
        return api.delete('/price-template/' + id);
    }
}

export default new PriceTemplateService();