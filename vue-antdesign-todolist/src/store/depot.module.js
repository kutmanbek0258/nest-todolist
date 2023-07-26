import DepotService from '../services/depot.service';
import router from "../router";

const state = {
    depot: null,
    depots: null,
    current: 1,
    pageSize: 10,
    totalCount: 0,
};

const actions = {
    createDepot({dispatch, commit}, {name,description, address, companyID, managerID}){
        DepotService.createDepot({name, description, address, companyID, managerID}).then(
            depot => {
                commit('setDepot', depot.data);
                router.push('/references/depot');
                dispatch('alert/success', 'Depot created success!', {root: true});
            }
        ).catch(error => {
            commit('setDepot', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        });
    },

    getAllDepots({dispatch, commit}, {current, pageSize}){
        const take = pageSize;
        const skip = (current === 0) ? 0 : pageSize * (current - 1);
        DepotService.getAllDepots({take, skip}).then(
            depots => {
                commit('setDepots', depots.data);
            }
        ).catch(error => {
            commit('setDepots', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getDepotById({dispatch, commit}, {id}){
        DepotService.getDepotById({id}).then(
            depot => {
                commit('setDepot', depot.data[0]);
            }
        ).catch(error => {
            commit('setDepot', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    updateDepot({dispatch, commit}, {id, name, description, address, companyID, managerID}){
        DepotService.updateDepot({id, name, description, address, companyID, managerID}).then(
            depot => {
                commit('setDepot', depot.data);
                router.push('/references/depot');
                dispatch('alert/success', 'Depot updated success!', {root: true});
            }
        ).catch(error => {
            commit('setDepot', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    deleteDepot({dispatch, commit}, {id}){
        DepotService.deleteDepot({id}).then(
            depot => {
                commit('setDepot', depot.data);
                router.go(0);
            }
        ).catch(error => {
            commit('setDepot', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    }
};

const mutations = {
    setDepot(state, depot){
        state.depot = depot;
    },

    setDepots(state, depots){
        state.depots = depots.depots;
        state.totalCount = depots.total;
    },

    setCurrent(state, current){
        state.current = current;
    },

    setPageSize(state, pageSize){
        state.pageSize = pageSize;
    }
};

export const depotModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}