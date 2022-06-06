import client from './http'

const createProject = (data) => {
    return client.post('/uploadProject',data)
}
const getProjects = () => {
    return client.get('/getProjects')
}
const deleteProject = (id) =>{
    return client.post(`/deleteProject/${id}`,)
}

const projectsServices={
    createProject: createProject,
    getProjects: getProjects,
    deleteProject: deleteProject
}

export default projectsServices;