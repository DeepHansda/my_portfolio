import { CREATE_CONTACT } from "../Common/types";
import contactServices from "../Common/contact_services"

export const createContact = (data) =>async(dispatch)=>{
    try{
        const res = await contactServices.createContact(data);
        dispatch({
            type:CREATE_CONTACT,
            payload:res.data
        })
        return Promise.resolve(res.data)
    }
    catch(err){
        return Promise.reject(err)
    }
}