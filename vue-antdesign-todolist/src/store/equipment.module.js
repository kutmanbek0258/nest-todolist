import EquipmentService from '../services/equipment.service';
import router from "../router";

const state = {
    equipment: null,
    equipments: null,
    current: 1,
    pageSize: 10,
    totalCount: 0
};

const actions = {
    createEquipment({dispatch, commit}, {name, description, type}){
        EquipmentService.createEquipment({name, description, type}).then(
            equipment => {
                commit('createEquipmentSuccess', equipment);
                dispatch('alert/success', "Equipment created success", {root: true});
                router.push('/equipments');
            }
        ).catch(
            error => {
                commit('createEquipmentFailure');
                dispatch('alert/error', error.response.data.message, {root: true});
            }
        )
    },

    getAllEquipments({dispatch, commit}, {current, pgeSize}){
        EquipmentService.getAllEquipments().then(
            equipments => {
                commit('getAllEquipmentsSuccess', equipments);
            }
        ).catch(
            error => {
                commit('getAllEquipmentsFailure');
                dispatch('alert/error', error.response.data.message, {root: true});
            }
        )
    },

    getEquipmentById({dispatch, commit}, {id}){
        EquipmentService.getEquipmentById({id}).then(
            equipment => {
                commit('getEquipmentByIdSuccess', equipment);
            }
        ).catch(
            error => {
                commit('getEquipmentByIdFailure');
                dispatch('alert/error', error.response.data.message, {root: true});
            }
        )
    },

    updateEquipment({dispatch, commit}, {id, name, description, type}){
        EquipmentService.updateEquipment({id, name, description, type}).then(
            equipment => {
                commit('updateEquipmentSuccess', equipment);
                dispatch('alert/success', "Equipment updated success", {root: true});
            }
        ).catch(
            error => {
                commit('updateEquipmentFailure');
                dispatch('alert/error', error.response.data.message, {root: true});
            }
        )
    },

    removeEquipment({dispatch, commit}, {id}){
        EquipmentService.removeEquipment({id}).then(
            equipment => {
                commit('removeEquipmentSuccess', equipment);
                dispatch('alert/success', "equipment removed success", {root: true});
                router.push('/equipments');
            }
        ).catch(
            error => {
                commit('removeEquipmentFailure');
                dispatch('alert/error', error.response.data.message, {root: true});
            }
        )
    }
};

const mutations = {
    createEquipmentSuccess(state, equipment){
        state.equipment = equipment;
    },

    createEquipmentFailure(state){
        state.equipment = null;
    },

    getAllEquipmentsSuccess(state, equipments){
        state.equipments = equipments;
    },

    getAllEquipmentsFailure(state){
        state.equipments = null;
    },

    getEquipmentByIdSuccess(state, equipment){
        state.equipment = equipment;
    },

    getEquipmentByIdFailure(state){
        state.equipment = null;
    },

    updateEquipmentSuccess(state, equipment){
        state.equipment = equipment;
    },

    updateEquipmentFailure(state){
        state.equipment = null;
    },

    removeEquipmentSuccess(state, equipment){
        state.equipment = equipment;
    },

    removeEquipmentFailure(state){
        state.equipment = null;
    },
};

export const equipmentModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}