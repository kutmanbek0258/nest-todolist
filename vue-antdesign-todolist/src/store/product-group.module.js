import ProductGroupService from '../services/product-group.service';
import router from '../router';

const state = {
    productGroup: null,
    productGroups: null,
    current: 0,
    pageSize: 10,
    totalCount: 0,
    dialogVisibleProductGroup: false,
    selectedProductGroup: {
        id: null,
        name: '',
    }
}

const actions = {
    createProductGroup({dispatch, commit}, {name, description}){
        ProductGroupService.createProductGroup({name, description}).then(
            productGroup => {
                commit('createProductGroupSuccess', productGroup.data);
                router.push('/references/product-group');
                dispatch('alert/success', 'Group created success!', {root: true});
            }
        ).catch(error => {
            commit('createProductGroupFailure');
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getAllProductGroups({dispatch, commit}, {current, pageSize}){
        const take = pageSize;
        const skip = (current === 0) ? 0 : pageSize * (current - 1);
        ProductGroupService.getAllProductGroup({take, skip}).then(
            productGroups => {
                commit('setCurrent', current);
                commit('setPageSize', pageSize);
                commit('getAllProductGroupsSuccess', productGroups.data);
            }
        ).catch(error => {
            commit('getAllProductGroupsFailure');
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getProductGroupById({dispatch, commit}, {id}){
        ProductGroupService.getProductGroupById({id}).then(
            productGroup => {
                commit('getProductGroupByIdSuccess', productGroup.data);
            }
        ).catch(error => {
            commit('getProductGroupByIdFailure');
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    updateProductGroup({dispatch, commit}, {id, name, description}){
        ProductGroupService.updateProductGroup({id, name, description}).then(
            productGroup => {
                commit('updateProductGroupSuccess', productGroup.data);
                router.push('/references/product-group')
                dispatch('alert/success', 'Group updated success!', {root: true});
            }
        ).catch(error => {
            commit('updateProductGroupFailure');
            dispatch('alert/error', error.response.data.message);
        })
    },

    deleteProductGroup({dispatch, commit}, {id}){
        ProductGroupService.deleteProductGroup({id}).then(
            productGroup => {
                commit('deleteProductGroupSuccess', productGroup.data);
                router.go(0);
                dispatch('alert/error', 'product-group deleted success!')
            }
        ).catch(error => {
            commit('deleteProductGroupFailure');
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    handleSelectProductGroup({dispatch, commit}, {id, name}){
        const selectedProductGroup = { id, name };
        commit('setSelectProductGroup', selectedProductGroup);
    },

    handleCloseSelectionProductGroup({dispatch, commit}){
        const selectedData = { id: null, name: '' };
        commit('setSelectProductGroup', selectedData);
    },

    setDialogVisibilityProductGroup({dispatch, commit}, {visibility}) {
        commit('setDialogVisibility', visibility);
    }
}

const mutations = {
    createProductGroupSuccess(state, productGroup){
        state.productGroup = productGroup;
    },

    createProductGroupFailure(state){
        state.productGroup = null;
    },

    getAllProductGroupsSuccess(state, productGroups){
        state.productGroups = productGroups.productGroups;
        state.totalCount = productGroups.total;
    },

    getAllProductGroupsFailure(state){
        state.productGroups = null;
    },

    getProductGroupByIdSuccess(state, productGroup){
        state.productGroup = productGroup;
    },

    getProductGroupByIdFailure(state){
        state.productGroup = null;
    },

    updateProductGroupSuccess(state, productGroup){
        state.productGroup = productGroup;
    },

    updateProductGroupFailure(state){
        state.productGroup = null;
    },

    deleteProductGroupSuccess(state, productGroup){
        state.productGroup = productGroup;
    },

    deleteProductGroupFailure(state){
        state.productGroup = null;
    },

    setCurrent(state, current){
        state.current = current;
    },

    setPageSize(state, pageSize) {
        state.pageSize = pageSize;
    },

    setDialogVisibility(state, visibility){
        state.dialogVisibleProductGroup = visibility;
    },

    setSelectProductGroup(state, selectedProductGroup){
        state.selectedProductGroup.id = selectedProductGroup.id;
        state.selectedProductGroup.name = selectedProductGroup.name;
    }
}

export const productGroupModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}