
import { useSelector } from 'react-redux'

import AllUsers from './AllUsers'
import OnlineUsers from './OnlineUsers'

import './SideBar.css'

const SideBar = ({beginChatHandler}) => {

  const onlineUsers = useSelector((state)=> state.online.users)

  return (
    <>
      <AllUsers/>
      <OnlineUsers
        beginChatHandler={beginChatHandler}
        onlineUsers={onlineUsers}
      />
    </>

  )
}

export default SideBar