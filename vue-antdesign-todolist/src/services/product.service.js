import api from './api';

class ProductService{
    createProduct({name, description, barcode, groupID, price_templateID}){
        return api.post('/product', {
            name,
            description,
            barcode,
            groupID,
            price_templateID,
        })
    }

    getAllProducts({take, skip}){
        return api.post('/product/get-all', {
            take, skip
        });
    }

    getProductById({id}){
        return api.get('/product/' + id);
    }

    updateProduct({id, name, description, barcode, groupID, price_templateID}){
        return api.patch('/product/' + id, {
            name,
            description,
            barcode,
            groupID,
            price_templateID,
        })
    }

    deleteProduct({id}){
        return api.delete('/product/' + id);
    }
}

export default new ProductService();