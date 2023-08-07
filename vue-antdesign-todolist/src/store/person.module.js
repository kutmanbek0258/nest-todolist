import PersonService from '../services/person.service';
import router from '../router';

const state = {
    person: null,
    persons: null,
    current: 1,
    pageSize: 10,
    totalCount: 0,
    dialogVisiblePerson: false,
    selectedPerson: {
        id: null,
        name: ''
    }
}

const actions = {
    createPerson({dispatch, commit}, {fullName, phone, email, address}){
        PersonService.createPerson({fullName, phone, email, address}).then(
            person => {
                commit('createPersonSuccess', person.data);
                router.push('/references/person');
                dispatch('alert/success', 'Person created success!', {root: true});
            }
        ).catch(error => {
            commit('createPersonFailure');
            dispatch('alert/error', error.response.data.message, {root: true});
        });
    },

    getAllPersons({dispatch, commit}, {current, pageSize}){
        const take = pageSize;
        const skip = (current === 0) ? 0 : pageSize * (current - 1);
        PersonService.getAllPersons({take, skip}).then(
            persons => {
                commit('getAllPersonsSuccess', persons.data);
                commit('setCurrent', current);
                commit('setPageSize', pageSize);
            }
        ).catch(error => {
            commit('getAllPersonsFailure');
            dispatch('alert/error', error.response.data.message, {root: true})
        })
    },

    getPersonById({dispatch, commit}, {id}){
        PersonService.getPersonById({id}).then(
            person => {
                commit('getPersonByIdSuccess', person.data);
            }
        ).catch(error => {
            commit('getPersonByIdFailure');
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    updatePerson({dispatch, commit}, {id, fullName, phone, email, address}){
        PersonService.updatePerson({id, fullName, phone, email, address}).then(
            person => {
                commit('updatePersonSuccess', person);
                router.push('/references/person');
                dispatch('alert/success', 'Person updated success!', {root: true})
            }
        ).catch(error => {
            commit('updatePersonFailure');
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    deletePerson({dispatch, commit}, {id}){
        PersonService.deletePerson({id}).then(
            person => {
                commit('deletePersonSuccess', person.data);
                router.go(0);
                dispatch('alert/success', 'Person deleted success!', {root: true});
            }
        ).catch(error => {
            commit('deletePersonFailure');
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    setDialogVisibilityPerson({dispatch, commit}, {visibility}) {
        commit('setDialogVisibility', visibility);
    },

    handleSelectPerson({dispatch, commit}, {id, name}){
        const selectedPerson = { id, name };
        commit('setSelectedPerson', selectedPerson);
    },

    handleCloseSelectionPerson({dispatch, commit}){
        const selectedPerson = {id: null, name: ''};
        commit('setSelectedPerson', selectedPerson);
    }
}

const mutations = {
    createPersonSuccess(state, person){
        state.person = person;
    },

    createPersonFailure(state){
        state.person = null;
    },

    getAllPersonsSuccess(state, persons){
        state.persons = persons.persons;
        state.totalCount = persons.total;
    },

    getAllPersonsFailure(state){
        state.persons = null;
    },

    getPersonByIdSuccess(state, person){
        state.person = person;
    },

    getPersonByIdFailure(state){
        state.person = null;
    },

    updatePersonSuccess(state, person){
        state.person = person;
    },

    updatePersonFailure(state){
        state.person = null;
    },

    deletePersonSuccess(state, person){
        state.person = person;
    },

    deletePersonFailure(state){
        state.person = null;
    },

    setCurrent(state, current){
        state.current = current;
    },

    setPageSize(state, pageSize){
        state.pageSize = pageSize;
    },

    setDialogVisibility(state, visibility) {
        state.dialogVisiblePerson = visibility;
    },

    setSelectedPerson(state, person){
        state.selectedPerson = person;
    },
}

export const personModule = {
    namespaced: true,
    state,
    actions,
    mutations
}