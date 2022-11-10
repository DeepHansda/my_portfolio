import http from './http_common'

const createContact = (data)=>{
    return http.post('/createContact',data)
}

const contactServices = {
    createContact,
}

export default contactServices