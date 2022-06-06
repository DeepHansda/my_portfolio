import {CREATE_PROJECT,RETRIVE_PROJECTS,DELETE_PROJECT} from '../Common/types'
import ProjectServices from '../Common/project_services'

export const createProject = (data) =>async(dispatch)=>{
    try{
        const res = await ProjectServices.createProject(data);
        dispatch({
            type: CREATE_PROJECT,
            payload: res.data
        })
        return Promise.resolve(res.data)
    }
    catch(err){
        return Promise.reject(err)
    }
}


export const getProjects = () => async(dispatch)=>{
    try{
        const res = await ProjectServices.getProjects()
        dispatch({
            type:RETRIVE_PROJECTS,
            payload: res.data
        })
        console.log(res)
        return Promise.resolve(res.data)
    }
    catch(err){
        return Promise.reject(err)
    }
}

export const deleteProject = (id) => async(dispatch)=>{
    try{
        // const res = await ProjectServices.deleteProject(id);
        dispatch({
            type:DELETE_PROJECT,
            payload: {id}
        })
    }
    catch(err){
        console.error(err)
    }
}