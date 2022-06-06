import http from './http_common'

const createProject = (data)=>{
    return http.post("/uploadProject",data)
}

const getProjects = ()=>{
    return http.get("/getProjects")
}

const deleteProject = (id)=>{
    return http.post(`/deleteProject/${id}`)
}

const ProjectServices = {
    createProject,
    getProjects,
    deleteProject
}

export default ProjectServices