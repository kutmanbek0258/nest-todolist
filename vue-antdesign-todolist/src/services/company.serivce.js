import api from './api';

class CompanyService {
  createCompany({name, description, address, phone, email}){
    return api.post('/company', {
      name,
      description,
      address,
      phone,
      email
    })
  }

  getAllCompanies({take, skip}){
    return api.post('/company/get-all', {
      take,
      skip
    });
  }

  getCompanyById({id}){
    return api.get('/company/' + id);
  }

  updateCompany({id, name, description, address, phone, email}){
    return api.patch('/company/' + id, {
      name,
      description,
      address,
      phone,
      email
    })
  }

  deleteCompany({id}){
    return api.delete('/company/' + id);
  }
}

export default new CompanyService();