import api from "./api";

class ProductService {

  createProduct({name, description, barcode, system_code, manufacturer}){
    return api.post('/product', {
      name,
      description,
      barcode,
      system_code,
      manufacturer
    });
  }

  getAllProducts({current, pageSize}){
    return api.post('/product/get-all', {current, pageSize});
  }

  getProductById({id}){
    return api.get('/product/' + id);
  }

  getProductsByKeyword({keyword, current, pageSize}){
    return api.post('/product/find/' + keyword, {current, pageSize});
  }

  updateProduct({id, name, description, barcode, system_code, manufacturer}){
    return api.patch('/product/' + id, {
      name,
      description,
      barcode,
      system_code,
      manufacturer,
    })
  }

  removeProduct({id}){
    return api.delete('/product/' + id);
  }
}

export default new ProductService();
