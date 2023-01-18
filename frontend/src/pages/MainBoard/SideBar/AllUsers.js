import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

const fetchUsers = async() => {
  const {data} = await axios.get('/api/users')
  console.log("DATA:",data)
  return data
}

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([])

  useEffect(()=>{
    console.log("userEFFECT")
    fetchUsers()
      .then(res=>{
        setAllUsers(res)
      })
      .catch(err=>{
        console.log(err)
      })
  },[])

  return (
    <div>
      <h3>all users</h3>
      {allUsers.length !== 0 ? allUsers?.map((user, idx)=>(
        <div key={user._id}>{user.username}</div>
      ))
    : (
      null
    )}
    </div>
  )
}

export default AllUsers