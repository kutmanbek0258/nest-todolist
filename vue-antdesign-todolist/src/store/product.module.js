import ProductService from '../services/product.service'
import router from "../router";

const state = {
    product: null,
    products: null,
    selectedProductId: null,
    selectedProductName: '',
    current: 1,
    pageSize: 10,
    totalCount: 0,
    dialogVisible: false,
};

const actions = {
    createProduct({dispatch, commit}, {user, name, description, barcode, system_code, manufacturer}){
        ProductService.createProduct({user, name, description, barcode, system_code, manufacturer})
            .then(
                product => {
                    commit('createProductSuccess', product);
                    router.push('/products')
                },
                error => {
                    commit('createProductFailure');
                    dispatch('alert/error', error.response.data.message, { root: true });
                }
            )
    },

    getAllProducts({dispatch, commit}, {current, pageSize}){
        ProductService.getAllProducts({current, pageSize}).then(
            products => {
                commit('currentSet', current);
                commit('pageSizeSet', pageSize);
                commit('getAllProductsSuccess', products);
            },
            error => {
                commit('getAllProductsFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

    getProductById({dispatch, commit}, {id}){
        ProductService.getProductById({id}).then(
            product => {
                commit('getProductByIdSuccess', product);
            },
            error => {
                commit('getProductByIdFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

    getProductsByKeyword({dispatch, commit}, {keyword, current, pageSize}){
        ProductService.getProductsByKeyword({keyword, current, pageSize}).then(
            products => {
                commit('currentSet', current);
                commit('pageSizeSet', pageSize);
                commit('getProductsByKeywordSuccess', products);
            },
            error => {
                commit('getProductsByKeywordFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

    updateProduct({dispatch, commit}, {id, name, description, barcode, system_code, manufacturer}){
        ProductService.updateProduct({id, name, description, barcode, system_code, manufacturer}).then(
            product => {
                commit('updateProductSuccess', product);
                router.push('/products');
            },
            error => {
                commit('updateProductFailure');
                dispatch('alert/error', error.response.data.message, { root: true })
            }
        )
    },

    removeProduct({dispatch, commit}, {id}){
        ProductService.removeProduct({id}).then(
            product => {
                commit('removeProductSuccess', product);
                router.go(0);
            },
            error => {
                commit('removeProductFailure');
                dispatch('alert/error', error.response.data.message, { root: true })
            }
        )
    },

    handleSelectProduct({dispatch, commit}, {id, name}) {
        commit('handleSelectProductSuccess', {id, name});
    },

    handleCloseSelection({dispatch, commit}){
        const id = null;
        const name = '';
        commit('handleSelectProductSuccess', {id, name});
    },

    setCurrent({dispatch, commit}, {current}){
        commit('currentSet', current);
    },

    setPageSize({dispatch, commit}, {pageSize}){
        commit('pageSizeSet', pageSize);
    },

    setDialogVisibility({dispatch, commit}, {visibility}){
        commit('setDialogVisible', visibility);
    }
}

const mutations = {
    createProductSuccess(state, product){
        state.product = product.data;
    },

    createProductFailure(state){
        state.product = null;
    },

    getAllProductsSuccess(state, products){
        state.products = products.data;
        state.totalCount = products.data.totalCount;
    },

    getAllProductsFailure(state){
        state.products = null;
    },

    getProductByIdSuccess(state, product){
        state.product = product.data;
    },

    getProductByIdFailure(state){
        state.product = null;
    },

    getProductsByKeywordSuccess(state, products){
        state.products = products.data;
        state.totalCount = products.data.totalCount;
    },

    getProductsByKeywordFailure(state){
        state.products = null;
    },

    updateProductSuccess(state, product){
        state.product = product.data;
    },

    updateProductFailure(state){
        state.product = null;
    },

    removeProductSuccess(state, product){
        state.product = product.data;
    },

    removeProductFailure(state){
        state.product = null;
    },

    handleSelectProductSuccess(state, {id, name}){
        state.selectedProductId = id;
        state.selectedProductName = name;
    },

    currentSet(state, current){
        state.current = current;
    },

    pageSizeSet(state, pageSize){
        state.pageSize = pageSize;
    },

    setDialogVisible(state, visibility){
        state.dialogVisible = visibility;
    },
}

export const productModule = {
    namespaced: true,
    state,
    actions,
    mutations
}