import axios from 'axios'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../../util/api'


const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([])

  useEffect(()=>{
    getAllUsers()
      .then(res=>{
        setAllUsers(res)
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