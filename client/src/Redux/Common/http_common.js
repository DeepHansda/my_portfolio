import axios from 'axios'

export default axios.create({
    baseURL:'http://localhost:3400/api',
    headers: {
        "Content-Type": 'application/json'
    }
})