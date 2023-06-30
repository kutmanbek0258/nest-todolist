import api from './api';

class PersonService{
    createPerson({fullName, phone, email, address}){
        return api.post('/person', {
            fullName,
            phone,
            email,
            address
        })
    }

    getAllPersons({take, skip}){
        return api.post('/person/get-all', {
            take,
            skip
        })
    }

    getPersonById({id}){
        return api.get('/person/' + id);
    }

    updatePerson({id, fullName, phone, email, address}){
        return api.patch('/person/' + id, {
            fullName,
            phone,
            email,
            address
        })
    }

    deletePerson({id}){
        return api.delete('/person/' + id);
    }
}

export default new PersonService();