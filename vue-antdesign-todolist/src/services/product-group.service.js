import api from './api';

class ProductGroupService{
    createProductGroup({name, description}){
        return api.post('/product-group', {
            name,
            description,
        });
    }

    getAllProductGroup({take, skip}){
        return api.post('/product-group/get-all', {
            take,
            skip,
        });
    }

    getProductGroupById({id}){
        return api.get('/product-group/' + id);
    }

    updateProductGroup({id, name, description}){
        return api.patch('/product-group/' + id, {
            name,
            description,
        });
    }

    deleteProductGroup({id}){
        return api.delete('/product-group/' + id);
    }
}

export default new ProductGroupService();