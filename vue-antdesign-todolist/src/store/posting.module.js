import PostingService from '../services/posting.service'
import router from "../router";

const state = {
    posting: null,
    postings: null,
    current: 1,
    pageSize: 10,
    totalCount: 0,
};

const actions = {

    createPosting({dispatch, commit}, {user, product, quantity, cell_number}){
        PostingService.createPosting({user, product, quantity, cell_number}).then(
            posting => {
                commit('createPostingSuccess', posting);
                dispatch('alert/success', "Posting created success", { root: true });
                router.push('/postings');
            },
            error => {
                commit('createPostingFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

    getAllPostings({dispatch, commit}, {current, pageSize}){
        PostingService.getAllPostings({current, pageSize}).then(
            postings => {
                commit('currentSet', current);
                commit('pageSizeSet', pageSize);
                commit('getAllPostingsSuccess', postings);
            },
            error => {
                commit('getAllPostingsFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

    getPostingById({dispatch, commit}, {id}){
        PostingService.getPostingById({id}).then(
            posting => {
                commit('getPostingByIdSuccess', posting);
            },
            error => {
                commit('getPostingByIdFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

    updatePosting({dispatch, commit}, {id, product, quantity, cell_number}){
        PostingService.updatePosting({id, product, quantity, cell_number}).then(
            posting => {
                commit('updatePostingSuccess', posting);
                dispatch('alert/success', "Posting updated success", { root: true });
                router.push('/postings');
            },
            error => {
                commit('updatePostingFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

    removePosting({dispatch, commit}, {id}){
        PostingService.removePosting({id}).then(
            posting => {
                commit('removePostingSuccess', posting);
                dispatch('alert/success', "Posting deleted success", { root: true });
                router.go(0);
            },
            error => {
                commit('removePostingFailure');
                dispatch('alert/error', error.response.data.message, { root: true });
            }
        )
    },

};

const mutations = {

    createPostingSuccess(state, posting){
        state.posting = posting.data;
    },

    createPostingFailure(state){
        state.posting = null;
    },

    getAllPostingsSuccess(state, postings){
        state.postings = postings.data;
        state.totalCount = postings.data.totalCount;
    },

    getAllPostingsFailure(state){
        state.postings = null;
    },

    getPostingByIdSuccess(state, posting){
        state.posting = posting.data;
    },

    getPostingByIdFailure(state){
        state.posting = null;
    },

    updatePostingSuccess(state, posting){
        state.posting = posting.data;
    },

    updatePostingFailure(state){
        state.posing = null;
    },

    removePostingSuccess(state, posting){
        state.posting = posting.data;
    },

    removePostingFailure(state){
        state.posting = null;
    },

    currentSet(state, current){
        state.current = current;
    },

    pageSizeSet(state, pageSize){
        state.pageSize = pageSize;
    },
};

export const postingModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}