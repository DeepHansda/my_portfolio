import axios from 'axios'

export default axios.create({
    baseURL:'https://portfolio-backend-deep-hansda0.herokuapp.com/api',
    headers: {
        "Content-Type": 'application/json'
    }
})