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

    getAllProducts({query, take, skip}){
        return api.post('/product/get-all', {
            query,
            take,
            skip,
        })
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

    uploadProductsCsv({file}){
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/product/upload-products-csv', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    }
}

export default new ProductService();