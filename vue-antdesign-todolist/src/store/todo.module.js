import TodoService from '../services/todo.serivce';
import router from '../router';

const state = {
  todo: null,
  todos: null,
  current: 1,
  pageSize: 10,
  totalCount: 0,
}

const actions = {
  createTodo({dispatch, commit}, {name, description, owner}){
    TodoService.createTodo({name, description, owner}).then(
      todo => {
        commit('createTodoSuccess', todo);
        dispatch('alert/success', 'Todo created success!', {root:true});
        router.push('/todos');
      }
    ).catch(error => {
      commit('createTodoFailure');
      dispatch('alert/error', error.response.data.message, {root:true})
    })
  },

  getAllTodos({dispatch, commit}){
    TodoService.getAllTodos().then(
      todos => {
        commit('getAllTodosSuccess', todos);
      }
    ).catch(error => {
      commit('getAllTodosFailure');
      dispatch('alert/error', error.response.data.message, {root: true});
    })
  },

  getTodoById({dispatch, commit}, {id}){
    TodoService.getTodoById({id}).then(
      todo => {
        commit('getTodoByIdSuccess', todo);
      }
    ).catch(error => {
      commit('getTodoByIdFailure');
      dispatch('alert/error', error.response.data.message, {root: true});
    })
  },

  updateTodo({dispatch, commit}, {id, name, description, owner, status}){
    TodoService.updateTodo({id, name, description, owner, status}).then(
      todo => {
        commit('updateTodoSuccess', todo);
        dispatch('alert/success', "Todo updates success!", {root: true});
        router.push('/todos');
      }
    ).catch(error => {
      commit('updateTodoFailure');
      dispatch('alert/error', error.response.data.message, {root: true});
    })
  },

  deleteTodo({dispatch, commit}, {id}){
    TodoService.deleteTodo({id}).then(
      todo => {
        commit('deleteTodoSuccess', todo);
        dispatch('alert/success', "Todo deleted success");
      }
    ).catch(error => {
      commit('deleteTodoFailure');
      dispatch('alert/error', error.response.data.message, {root: true});
    })
  }
}

const mutations = {
  createTodoSuccess(state, todo){
    state.todo = todo
  },

  createTodoFailure(state){
    state.todo = null;
  },

  getAllTodosFailure(state, todos){
    state.todos = todos
  },

  getAllTodosSuccess(state){
    state.todos = null;
  },

  getTodoByIdSuccess(state, todo){
    state.todo = todo;
  },

  getTodoByIdFailure(state){
    state.todo = null;
  },

  updateTodoSuccess(state, todo){
    state.todo = todo;
  },

  updateTodoFailure(state){
    state.todo = null;
  },

  deleteTodoSuccess(state, todo){
    state.todo = todo;
  },

  deleteTodoFailure(state){
    state.todo = null;
  }
}

export const todoModule = {
  namespaced: true,
  state,
  actions,
  mutations
}