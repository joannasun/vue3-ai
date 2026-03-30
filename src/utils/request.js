import axios from "axios";
import { ElMessage } from 'element-plus'
const service = axios.create({
    baseURL: '/api',
    timeout: 40000
})

service.interceptors.request.use(
    config => {
        // config.headers['Content-Type'] = 'application/json'
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['token'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const { data, config} = response
        if (data.code == 200) {
            return data.data
        } else if (data.code == -1){
            if(!config.url.includes('/login')){
               ElMessage.error(data.msg || '登录国企重新登录')
               localStorage.removeItem('token')
               localStorage.removeItem('userInfo')
               window.location.href = '/auth/login'
            }
        } else {
            ElMessage.error(data.msg || '请求失败')
            // Promise.reject(data)
            return data
        }
        return response
    },
    error => {
        Promise.reject(error)
        return error

    }
)

export default service
