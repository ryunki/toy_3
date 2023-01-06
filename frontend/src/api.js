import axios from 'axios'

export const login = async(user) => {
  
  try{
    const {data} = await axios.post('/api/login', user)
    console.log(data)
  }catch(err){
    console.log(err)
  }
}
export const register = async(user) => {
  try{
    const {data} = await axios.post('/api/register', user)
    console.log(data)
  }catch(err){
    console.log(err)
  }
}