import NoteService from '../services/note.service';
import router from '../router';

const state = {
    note: null,
    notes: null,
    current: 1,
    pageSize: 10,
    totalCount: 0,
}

const actions = {
    createNote({dispatch, commit}, {equipment, note, master, status}){
        NoteService.createNote({equipment, note, master, status}).then(
            note => {
                commit('createNoteSuccess', note);
                dispatch('alert/success', "Note created success", {root: true});
                router.push('/notes');
            }
        ).catch(
            error => {
                commit('createNoteFailure');
                dispatch('alert/error', error.response.data.message, {root: true});
            }
        )
    },

    getAllNotes({dispatch, commit}, {current, pageSize}){
        NoteService.getAllNotes().then(
            notes => {
                commit('getAllNotesSuccess', notes);
            }
        ).catch(
            error => {
                commit('getAllNotesFailure');
                dispatch('alert/error', error.response.data.message, {root: true});
            }
        )
    },

    getNoteById({dispatch, commit}, {id}){
        NoteService.getNoteById({id}).then(
            note => {
                commit('getNoteByIdSuccess', note);
            }
        ).catch(
            error => {
                commit('getNoteByIdFailure');
                dispatch('alert/error', error.response.data.message, {root: true});
            }
        )
    },

    updateNote({dispatch, commit}, {id, equipment, note, master, status}){
        NoteService.updateNote({id, equipment, note, master, status}).then(
            note => {
                commit('updateNoteSuccess', note);
                dispatch('alert/success', "Note updates success", {root: true});
                router.push('/notes');
            }
        ).catch(
            error => {
                commit('updateNoteFailure');
                dispatch('alert/error', error.response.data.message, {root: true});
            }
        )
    },

    removeNote({dispatch, commit}, {id}){
        NoteService.removeNote({id}).then(
            note => {
                commit('removeNoteSuccess', note);
                dispatch('alert/success', "Note removed success", {root: true});
                router.push('/notes');
            }
        ).catch(
            error => {
                commit('removeNoteFailure');
                dispatch('alert/error', error.response.data.message, {root: true});
            }
        )
    }
}

const mutations = {
    createNoteSuccess(state, note){
        state.note = note;
    },

    createNoteFailure(state){
        state.note = null;
    },

    getAllNotesSuccess(state, notes){
        state.notes = notes;
    },

    getAllNotesFailure(state){
        state.notes = null;
    },

    getNoteByIdSuccess(state, note){
        state.note = note;
    },

    getNoteByIdFailure(state){
        state.note = null;
    },

    updateNoteSuccess(state, note){
        state.note = note;
    },

    updateNoteFailure(state){
        state.note = null;
    },

    removeNoteSuccess(state, note){
        state.note = note;
    },

    removeNoteFailure(state){
        state.note = null;
    },
}

export const noteModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}