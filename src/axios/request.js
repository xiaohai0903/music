import axios from 'axios'

export function request(options) {
    return new Promise((resolve, reject) =>{
        const instance =axios.create({
            baseURL:'http://localhost:3000/',
            timeout:5000
        })

        instance.interceptors.response.use(res =>{
            return res
        })
        instance(options).then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}
