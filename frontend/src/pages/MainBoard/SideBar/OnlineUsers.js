import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const OnlineUsers = ({ beginChatHandler, onlineUsers }) => {

  const userDataRedux = useSelector(state => state.user)
  const newChatRedux = useSelector(state=>state.chat)
  const notificationRedux = useSelector(state=>state.notification)
  // const onlineUsersRedux = useSelector(state=>state.online.users)


  return (
    <div className="sidebar-container">
        <h3>Online Users</h3>
        {onlineUsers && onlineUsers.map((item,idx)=>(
          <div className="userlist-container" key={idx}>
            <div className="username-container">
              {/* make them clickable except yourself */}
              {userDataRedux.username !== item.userData.username ? (
                <>
                  <div className="pointer" onClick={()=>beginChatHandler(item.socket, item.userData._id, item.userData.username)}>{item.userData.username}</div>
                  {/* {newChatRedux.messages.length !== 0 ? ( */}
                  {/* {notificationRedux.incomingMessages.map((convo, idx)=>
                    (convo.senderId === item.userData._id && 
                      notificationRedux.currentChat !== convo.senderId &&
                      !convo.messageChecked &&
                      <div key={convo.senderId} className="pointer notification"></div>
                    )
                  )} */}
                  <div className="pointer"></div>
                </>
                ) : (
                  <div>{item.userData.username}</div>
                )
              }
            </div>
            {/* <div>{item.userData.email}</div> */}
          </div>
        ))}
      </div>
  )
}

export default OnlineUsers