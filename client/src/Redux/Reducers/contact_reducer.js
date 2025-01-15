import { CREATE_CONTACT } from "../Common/types";
const initialState=[];

const contactReducer = (contacts = initialState , action)=>{
    const {type,payload} = action;
    switch(type){
        case CREATE_CONTACT :
            return [...contacts, payload]
        default:
            return contacts
    }
}
export default contactReducer;