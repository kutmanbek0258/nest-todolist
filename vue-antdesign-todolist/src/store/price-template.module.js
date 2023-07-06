import PriceTemplateService from '../services/price-template.service'
import router from '../router';

const state = {
    priceTemplate: null,
    priceTemplates: null,
    current: 1,
    pageSize: 10,
    totalCount: 0
}

const actions = {
    createPriceTemplate({dispatch, commit}, {name, description, formula}){
        PriceTemplateService.createPriceTemplate({name, description, formula}).then(
            priceTemplate => {
                commit('setPriceTemplate', priceTemplate.data);
                router.push('/references/price-template');
                dispatch('alert/success', 'Price-template created success!', {root: true});
            }
        ).catch(error => {
            commit('setPriceTemplate', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getAllPriceTemplates({dispatch, commit}, {current, pageSize}){
        const take = pageSize;
        const skip = (current === 0) ? 0 : pageSize * (current - 1);
        PriceTemplateService.getAllPriceTemplates({take, skip}).then(
            priceTemplates => {
                commit('setPriceTemplates', priceTemplates.data);
                commit('setCurrent', current);
                commit('setPageSize', pageSize);
            }
        ).catch(error => {
            commit('setPriceTemplates', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getPriceTemplateById({dispatch, commit}, {id}){
        PriceTemplateService.getPriceTemplateById({id}).then(
            priceTemplate => {
                commit('setPriceTemplate', priceTemplate.data);
            }
        ).catch(error => {
            commit('setPriceTemplate', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    updatePriceTemplate({dispatch, commit}, {id, name, description, formula}){
        PriceTemplateService.updatePriceTemplate({id, name, description, formula}).then(
            priceTemplate => {
                commit('setPriceTemplate', priceTemplate.data);
                router.push('/references/price-template');
                dispatch('alert/success', 'Price-template updates success!', {root: true});
            }
        ).catch(error => {
            commit('setPriceTemplate', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    deletePriceTemplate({dispatch, commit}, {id}){
        PriceTemplateService.deletePriceTemplate({id}).then(
            priceTemplate => {
                commit('setPriceTemplate', priceTemplate.data);
                router.go(0);
                dispatch('alert/success', 'Price-template deleted success!', {root: true});
            }
        ).catch(error => {
            commit('setPriceTemplate', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    }
}

const mutations = {
    setPriceTemplate(state, priceTemplate){
        state.priceTemplate = priceTemplate;
    },

    setPriceTemplates(state, priceTemplates){
        state.priceTemplates = priceTemplates.priceTemplates;
        state.totalCount = priceTemplates.total;
    },

    setCurrent(state, current){
        state.current = current;
    },

    setPageSize(state, pageSize){
        state.pageSize = pageSize;
    }
}

export const priceTemplateModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}