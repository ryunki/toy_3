
import { useSelector } from 'react-redux'

import AllUsers from './AllUsers'
import OnlineUsers from './OnlineUsers'

import './SideBar.css'

const SideBar = ({ userData, beginChatHandler}) => {

  const onlineUsers = useSelector((state)=> state.online.users)

  return (
    <>
      <AllUsers/>
      <OnlineUsers
        userData={userData} 
        beginChatHandler={beginChatHandler}
        onlineUsers={onlineUsers}
      />
    </>

  )
}

export default SideBar