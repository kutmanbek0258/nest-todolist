import api from './api'

class PostingService{

    createPosting({user, product, quantity, cell_number}){
        return api.post('/posting', {
            user,
            product,
            quantity,
            cell_number,
        });
    }

    getAllPostings({current, pageSize}){
        return api.post('/posting/get-all', {current, pageSize});
    }

    getPostingById({id}){
        return api.get('/posting/' + id);
    }

    updatePosting({id, user, product, quantity, cell_number}){
        return api.patch('/posting/' + id, {
            user,
            product,
            quantity,
            cell_number,
        });
    }

    removePosting({id}){
        return api.delete('/posting/' + id);
    }

}

export  default  new PostingService();