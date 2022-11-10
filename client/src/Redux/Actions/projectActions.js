import { RETRIVE_PROJECTS_SUCCESS, RETRIVE_PROJECTS_REQUEST, RETRIVE_PROJECTS_FAIL} from '../Common/types'
import ProjectServices from '../Common/project_services'



export const getProjects = () => async(dispatch)=>{
    try{
        dispatch({
            type:RETRIVE_PROJECTS_REQUEST
        })
        const res = await ProjectServices.getProjects()
        dispatch({
            type:RETRIVE_PROJECTS_SUCCESS,
            payload: res.data
        })
        return Promise.resolve(res.data)
    }
    catch(err){
        dispatch({
            type:RETRIVE_PROJECTS_FAIL,
            payload: err.response
        })
        return Promise.reject(err)
    }
}