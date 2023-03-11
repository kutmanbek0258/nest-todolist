import ReceiptService from '../services/receipt.service'
import router from "../router";

const state = {
    receipt: null,
    receipts: null,
    current: 1,
    pageSize: 10,
    totalCount: 0,
};

const actions = {

    createReceipt({dispatch, commit}, {user, product, quantity, cell_number}){
        ReceiptService.createReceipt({user, product, quantity, cell_number}).then(
            receipt => {
                commit('createReceiptSuccess', receipt);
                dispatch('alert/success', "Receipt created success", { root: true });
                router.push('/receipts');
            },
            error => {
                commit('createReceiptFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

    getAllReceipts({dispatch, commit}, {current, pageSize}){
        ReceiptService.getAllReceipts({current, pageSize}).then(
            receipts => {
                commit('currentSet', current);
                commit('pageSizeSet', pageSize);
                commit('getAllReceiptsSuccess', receipts);
            },
            error => {
                commit('getAllReceiptsFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

    getReceiptById({dispatch, commit}, {id}){
        ReceiptService.getReceiptById({id}).then(
            receipt => {
                commit('getReceiptByIdSuccess', receipt);
            },
            error => {
                commit('getReceiptByIdFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

    updateReceipt({dispatch, commit}, {id, product, quantity, cell_number}){
        console.log('called update');
        ReceiptService.updateReceipt({id, product, quantity, cell_number}).then(
            receipt => {
                commit('updateReceiptSuccess', receipt);
                dispatch('alert/success', "Posting updated success", { root: true });
                router.push('/receipts');
            },
            error => {
                commit('updateReceiptFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

    removeReceipt({dispatch, commit}, {id}){
        ReceiptService.removeReceipt({id}).then(
            receipt => {
                commit('removeReceiptSuccess', receipt);
                dispatch('alert/success', "Posting removed success", { root: true });
                router.go(0);
            },
            error => {
                commit('removeReceiptFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

};

const mutations = {
    createReceiptSuccess(state, receipt){
        state.receipt = receipt.data;
    },

    createReceiptFailure(state){
        state.receipt = null;
    },

    getAllReceiptsSuccess(state, receipts){
        state.receipts = receipts.data;
        state.totalCount = receipts.data.totalCount;
    },

    getAllReceiptsFailure(state){
        state.receipts = null;
    },

    getReceiptByIdSuccess(state, receipt){
        state.receipt = receipt.data;
    },

    getReceiptByIdFailure(state){
        state.receipt = null;
    },

    updateReceiptSuccess(state, receipt){
        state.receipt = receipt;
    },

    updateReceiptFailure(state){
        state.receipt = null;
    },

    removeReceiptSuccess(state, receipt){
        state.receipt = receipt;
    },

    removeReceiptFailure(state){
        state.receipt = null;
    },

    currentSet(state, current){
        state.current = current;
    },

    pageSizeSet(state, pageSize){
        state.pageSize = pageSize;
    },
};

export const receiptModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}