import api from './api';

class NoteService{

    createNote({equipment, note, master, status}){
        return api.post('/note', {
            equipment,
            note,
            master,
            status,
        })
    }

    getAllNotes(){
        return api.get('/note')
    }

    getNoteById({id}){
        return api.get('/note/' + id)
    }

    updateNote({id, equipment, note, master, status}){
        return api.put('/note/' + id, {
            equipment,
            note,
            master,
            status,
        })
    }

    removeNote({id}){
        return api.delete('/note/' + id)
    }

}

export default new NoteService();