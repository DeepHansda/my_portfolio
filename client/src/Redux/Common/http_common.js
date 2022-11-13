import axios from 'axios'
// http://localhost:3400/api/
// https://my-portfolio-backend-deephansda.vercel.app/api
export default axios.create({
    baseURL:'https://my-portfolio-backend-deephansda.vercel.app/api',
    headers: {
        "Content-Type": 'application/json'
    }
})