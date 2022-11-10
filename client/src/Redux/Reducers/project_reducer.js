import {
  CREATE_PROJECT,
  RETRIVE_PROJECTS,
  DELETE_PROJECT,
} from "../Common/types";

const initialState =[];

function projectReducer(projects = initialState ,action){
    const {type,payload} = action;

    switch(type){
        case CREATE_PROJECT :
            return [...projects, payload]
        case RETRIVE_PROJECTS:
            return payload
        case DELETE_PROJECT:
            return projects.filter(({id})=>id !== payload.id)
        default:
        return projects
    }
}

export default projectReducer