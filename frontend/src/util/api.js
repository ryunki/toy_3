import axios from 'axios'

export const login = async(user) => {
  
  try{
    const {data} = await axios.post('/api/login', user)
    return data
  }catch(err){
    return err
  }
}
export const register = async(user) => {
  try{
    const {data} = await axios.post('/api/register', user)
    return data
  }catch(err){
    return err
  }
}