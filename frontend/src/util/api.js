import axios from 'axios'
import { logout } from './auth'

// creating custom instance of axios
const apiClient = axios.create({
  baseURL: '/api',
  timeout:1000, //how long to wait for response
})

// for running codes in secured routes. 
// sending tokens for authorization in the backend for every request
apiClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user")
    if(user){
      const token = JSON.parse(user).token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export const login = async(user, navigate) => {
  try{
    const {data} = await apiClient.post('/login', user)
    return data
  }catch(err){
    navigate('/')
    return err
  }
}
export const register = async(user) => {
  try{
    const {data} = await apiClient.post('/register', user)
    return data
  }catch(err){
    return err
  }
}

export const getAllUsers = async()=>{
  try{
    const {data} = await apiClient.get('/users')
    return data
  }catch(err){
    // when the token expires -> status 401
    checkResponseCode(err)
    return err
  }
}

// export const getToken = async()=>{
//   try{
//     const {data} = await apiClient.get('/get-token')
//     return data
//   }catch(err){
//     // checkResponseCode(err)
//     return err
//   }
// }

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;
  if(responseCode){
    (responseCode === 401 || responseCode === 403) && logout()
  }
}