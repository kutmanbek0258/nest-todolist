import ReportService from '../services/report.service'

const state = {
    fullReport: null,
    productReport: null,
};

const actions = {

    getFullReport({dispatch, commit}){
        ReportService.fullReport().then(
            report => {
                commit('fullReportSuccess', report);
            },
            error => {
                commit('fullReportFailure');
                dispatch('alert/error', error.data.message, { root: true })
            }
        )
    },

    productFullReport({dispatch, commit}, {id}){
        ReportService.productFullReport({id}).then(
            report => {
                commit('productFullReportSuccess', report);
            },
            error => {
                commit('productFullReportFailure');
                dispatch('alert/error', error.data.message, { root: true })
            }
        )
    }
};

const mutations = {
    fullReportSuccess(state, report){
        state.fullReport = report.data;
    },
    fullReportFailure(state){
        state.fullReport = null;
    },
    productFullReportSuccess(state, report){
        state.productReport = report.data;
    },
    productFullReportFailure(state){
        state.productReport = null;
    },
};

export const reportModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}