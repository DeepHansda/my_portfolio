import http from './http_common'

const createContact = (data)=>{
    return http.post('/createContact',data)
}
const getContacts = ()=>{
    return http.get('/getContacts')
}
const deleteContacts = (id) =>{
    return http.delete(`/deleteContacts/${id}`)
}

const contactServices = {
    createContact,
    getContacts,
    deleteContacts
}

export default contactServices