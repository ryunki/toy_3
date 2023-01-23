import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../../util/api'


const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([])
 
  const user =  useSelector(state=>state.user)

  useEffect(()=>{
    if(user){
      getAllUsers()
        .then(res=>{
          setAllUsers(res)
        })
    }
  },[user])

  return (
    <div>
      <h3>all users</h3>
      {allUsers.length !== 0 ? allUsers.map((user, idx)=>(
        <div key={user._id}>{user.username}</div>
      ))
    : (
      <h5>no users</h5>
    )}
    </div>
  )
}

export default AllUsers