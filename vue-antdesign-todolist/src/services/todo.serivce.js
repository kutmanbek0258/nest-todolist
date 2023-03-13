import api from './api';

class TodoSerivce{
  createTodo({name, description, owner}){
    return api.post('/todo', {
      name,
      description,
      owner
    })
  }

  getAllTodos(){
    return api.get('/todo');
  }

  getTodoById({id}){
    return api.get('/todo/' + id);
  }

  updateTodo({id, name, description, owner, status}){
    return api.patch('/todo/' + id, {
      name,
      description,
      owner,
      status
    })
  }

  deleteTodo({id}){
    return api.delete('/todo/' + id);
  }
}