import SupplierService from "../services/supplier.service";
import router from "../router";

const state = {
    supplier: null,
    suppliers: null,
    current: 0,
    pageSize: 10,
    totalCount: 0,
};

const actions = {
    createSupplier({dispatch, commit}, {companyID, personID}){
        SupplierService.createSupplier({companyID, personID}).then(
            supplier => {
                commit('setSupplier', supplier.data);
                router.push('/references/supplier');
                dispatch('alert/success', 'Supplier created success!', {root: true});
            }
        ).catch(error => {
            commit('setSupplier', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getAllSuppliers({dispatch, commit}, {current, pageSize}){
        const take = pageSize;
        const skip = (current === 0) ? 0 : pageSize * (current - 1);
        SupplierService.getAllSuppliers({take, skip}).then(
            suppliers => {
                console.log(suppliers.data.suppliers);
                commit('setSuppliers', suppliers.data);
            }
        ).catch(error => {
            const nullData = {
                suppliers: null,
                total: 0,
            }
            commit('setSuppliers', nullData);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getSupplierById({dispatch, commit}, {id}){
        SupplierService.getSupplierById({id}).then(
            supplier => {
                commit('setSupplier', supplier.data);
            }
        ).catch(error => {
            commit('setSupplier', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    updateSupplier({dispatch, commit}, {id, companyID, personID}){
        SupplierService.updateSupplier({id, companyID, personID}).then(
            supplier => {
                commit('setSupplier', supplier.data);
                router.push('/references/supplier');
                dispatch('alert/success', 'Supplier updated success!', {root: true});
            }
        ).catch(error => {
            commit('setSupplier', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    deleteSupplier({dispatch, commit}, {id}){
        SupplierService.deleteSupplier({id}).then(
            supplier => {
                commit('setSupplier', supplier.data);
                router.go(0);
            }
        ).catch(error => {
            commit('setSupplier', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },
};

const mutations = {
    setSupplier(state, supplier){
        state.supplier = supplier;
    },

    setSuppliers(state, suppliers){
        state.suppliers = suppliers.suppliers;
        state.totalCount = suppliers.total;
    },

    setCurrent(state, current){
        state.current = current;
    },

    setPageSize(state, pageSize){
        state.pageSize = pageSize;
    },
};

export const supplierModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}