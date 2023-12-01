import axios from 'axios';
import { API_URL } from '../Config'

const axiosJWT = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});
function refreshToken() {
    return axios({
        method: 'post',
        url: API_URL + '/api/v1/refreshToken',
        withCredentials: true
    })
}
function logOut() {
    axios({
        method: 'post',
        url: API_URL + '/api/v1/logout',
        withCredentials: true
    })
    .then(()=>{
        window.location.href = '/login';
        localStorage.clear()
    })
    .catch((err)=>{
        console.log(err);
    })
}
axiosJWT.interceptors.response.use(
    response => response,
    async(error) => {
        try {
            if (error?.response?.data.name === "TokenExpiredError") {
                await refreshToken()
                //refresh thanh cong -> goi lai api 
                return axiosJWT.request(error.config)
            }
            if (error?.response?.data.message === 'Khong tim thay access token') {
                alert('Vui lòng đăng nhập')
                logOut()
                return  
            }
            
            return Promise.reject(error)
        } catch (err) {
            //refresh that bai
            
            return Promise.reject(err)
        }
        
    }
)
export default axiosJWT