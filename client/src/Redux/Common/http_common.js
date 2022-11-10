import axios from 'axios'

export default axios.create({
    baseURL:'https://my-portfolio-backend-deephansda.vercel.app/api',
    headers: {
        "Content-Type": 'application/json'
    }
})