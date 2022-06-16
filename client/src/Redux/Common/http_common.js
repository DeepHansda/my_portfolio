import axios from 'axios'

export default axios.create({
    baseURL:'https://z8a0f6a31-zdd2ce048-gtw.z2f1dc6a0.prm.sh/api',
    headers: {
        "Content-Type": 'application/json'
    }
})