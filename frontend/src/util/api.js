import axios from 'axios'
import { logout } from './auth'
const apiClient = axios.create({
  baseURL: '/api',
  timeout:1000, //how long to wait for response
})

// for running codes in secured routes. sending tokens to backend
// apiClient.interceptors.request.use(
//   (config) => {
//     const user = localStorage.getItem("user")
//     if(user){
//       const token = JSON.parse(user).token
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log(token)
//     }
//     return config
//   },
//   (err) => {
//     return Promise.reject(err)
//   }
// )

export const login = async(user) => {
  try{
    const {data} = await apiClient.post('/login', user)
    return data
  }catch(err){
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

// const checkResponseCode = (exception) => {
//   const responseCode = exception?.response?.status;
//   if(responseCode){
//     (responseCode === 401 || responseCode === 403) && logout()
//   }
// }