import axios from 'axios'

export default client = axios.create({
    baseUrl: 'http://localhost:3400/api/'
})  