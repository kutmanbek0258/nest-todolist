import ProductService from '../services/product.service';
import router from '../router';

const state = {
    product: null,
    products: null,
    current: 1,
    pageSize: 10,
    totalCount: 0,
    dialogVisibleProduct: false,
    selectedProduct: {
        id: null,
        name: '',
    },
    uploadedProducts: null,
}

const actions = {
    createProduct({dispatch, commit}, {name, description, barcode, groupID, price_templateID}){
        ProductService.createProduct({name, description, barcode, groupID, price_templateID}).then(
            product => {
                commit('setProduct', product.data);
                router.push('/references/product');
                dispatch('alert/success', 'Product created success!', { root: true});
            }
        ).catch(error => {
            commit('setProduct', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getAllProducts({dispatch, commit}, {query, current, pageSize}){
        const take = pageSize;
        const skip = (current === 0) ? 0 : pageSize * (current - 1);
        ProductService.getAllProducts({query, take, skip}).then(
            products => {
                commit('setProducts', products.data);
                commit('setCurrent', current);
                commit('setPageSize', pageSize)
            }
        ).catch(error => {
            commit('setProducts', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getProductById({dispatch, commit}, {id}){
        ProductService.getProductById({id}).then(
            product => {
                commit('setProduct', product.data);
            }
        ).catch(error => {
            commit('setProduct', null);
            dispatch('alert/error', error.response.data.message, {root: true})
        })
    },

    updateProduct({dispatch, commit}, {id, name, description, barcode, groupID, price_templateID}){
        ProductService.updateProduct({id, name, description, barcode, groupID, price_templateID}).then(
            product => {
                commit('setProduct', product.data);
                router.push('/references/product');
                dispatch('alert/success', 'Product created success!', {root: true});
            }
        ).catch(error => {
            commit('setProduct', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    deleteProduct({dispatch, commit}, {id}){
        ProductService.deleteProduct({id}).then(
            product => {
                commit('setProduct', product.data);
                router.go(0);
            }
        ).catch(error => {
            dispatch('alert/error', error.response.data.message, {root: true});
            commit('setProduct', null);
        })
    },

    uploadProductsCsvFile({dispatch, commit}, {file}){
        console.log(file);
        ProductService.uploadProductsCsv({file}).then(
            products => {
                dispatch('alert/success', 'Uploaded success!', {root: true});
                commit('setUploadedProducts', products.data);
            }
        ).catch(error => {
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    setDialogVisibleProduct({dispatch, commit}, {visibility}){
        commit('setDialogVisibleProduct', visibility);
    },

    setSelectedProduct({dispatch, commit}, {id, name}){
        const selectedProduct = { id, name };
        const dialogVisible = false;
        commit('setSelectedProduct', selectedProduct);
        commit('setDialogVisibleProduct', dialogVisible);
    }
}

const mutations = {
    setProduct(state, product){
        state.product = product[0];
    },

    setProducts(state, products){
        state.products = products.products;
        state.totalCount = products.total;
    },

    setCurrent(state, current){
        state.current = current;
    },

    setPageSize(state, pageSize){
        state.pageSize = pageSize;
    },

    setDialogVisibleProduct(state, visibility){
        state.dialogVisibleProduct = visibility;
    },

    setSelectedProduct(state, selectedProduct){
        state.selectedProduct = selectedProduct;
    },

    setUploadedProducts(state, products){
        state.uploadedProducts = products;
    }
}

export const productModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}