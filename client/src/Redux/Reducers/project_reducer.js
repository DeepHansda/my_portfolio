import { RETRIVE_PROJECTS_FAIL, RETRIVE_PROJECTS_REQUEST, RETRIVE_PROJECTS_SUCCESS } from "../Common/types";


function projectReducer(state = {projects:[]} ,action){
    const {type,payload} = action;

    switch(type){
        case RETRIVE_PROJECTS_REQUEST:
            return {
                loading:true
            }
        case RETRIVE_PROJECTS_SUCCESS:
            return {
                loading:false,
                projects:payload
            }
        case RETRIVE_PROJECTS_FAIL:
            return {
                loading:false,
                error:payload
            }
        default:
        return state
    }
}

export default projectReducer