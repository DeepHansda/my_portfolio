import http from './http_common'

const getProjects = ()=>{
    return http.get("/getProjects")
}


const ProjectServices = {
    getProjects,
}

export default ProjectServices