import SalesmanService from '../services/salesman.service';
import router from "../router";

const state = {
    salesman: null,
    salesmen: null,
    current: 1,
    pageSize: 10,
    totalCount: 0,
};

const actions = {
    createSalesman({dispatch, commit}, {personID, companyID}){
        SalesmanService.createSalesman({personID, companyID}).then(
            salesman => {
                commit('setSalesman', salesman.data);
                router.push('/references/salesman');
                dispatch('alert/success', 'Salesman created success!', {root: true});
            }
        ).catch(error => {
            commit('setSalesman', null);
        })
    },

    getAllSalesmen({dispatch, commit}, {current, pageSize}){
        const take = pageSize;
        const skip = (current === 0) ? 0 : pageSize * (current - 1);
        SalesmanService.getAllSalesmen({take, skip}).then(
            salesmen => {
                commit('setSalesmen', salesmen.data);
            }
        ).catch(error => {
            commit('setSalesmen', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getSalesmanById({dispatch, commit}, {id}){
        SalesmanService.getSalesmanById({id}).then(
            salesman => {
                commit('setSalesman', salesman.data[0]);
            }
        ).catch(error => {
            commit('setSalesman', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    updateSalesman({dispatch, commit}, {id, personID, companyID}){
        SalesmanService.updateSalesman({id, personID, companyID}).then(
            salesman => {
                commit('setSalesman', salesman.data);
                router.push('/references/salesman');
                dispatch('alert/success', 'Salesman updated success!', {root: true});
            }
        ).catch(error => {
            commit('setSalesman', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    deleteSalesman({dispatch, commit}, {id}){
        SalesmanService.deleteSalesman({id}).then(
            salesman => {
                commit('setSalesman', salesman.data);
                router.go(0);
            }
        ).catch(error => {
            commit('setSalesman', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    }
};

const mutations = {
    setSalesman(state, salesman){
        state.salesman = salesman;
    },

    setSalesmen(state, salesmen){
        state.salesmen = salesmen.salesmen;
        state.totalCount = salesmen.total;
    },

    setCurrent(state, current){
        state.current = current;
    },

    setPageSize(state, pageSize){
        state.pageSize = pageSize;
    },
};

export const salesmanModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}