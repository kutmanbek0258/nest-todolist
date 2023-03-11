import api from './api';

class ReportService{

    fullReport(){
        return api.post('/report/full');
    }

    productFullReport({id}){
        return api.get('/report/product-full-report/' + id);
    }

}

export default new ReportService();