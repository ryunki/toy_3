import { useSelector } from 'react-redux'

const OnlineUsers = ({ userData, beginChatHandler,onlineUsers}) => {

  

  return (
    <div className="sidebar-container">
        <h3>Online Users</h3>
        {onlineUsers && onlineUsers.map((item,idx)=>(
          <div className="userlist-container" key={idx}>
            <div className="username-container">
              {/* make them clickable except yourself */}
              {userData.username !== item.userData.username ?
              <>
                <div className="pointer" onClick={()=>beginChatHandler(item.socket, item.userData._id, item.userData.username)}>{item.userData.username}</div>
                <div className="pointer">add</div>
              </>
              :<div>{item.userData.username}</div>
              }
            </div>
            <div>{item.userData.email}</div>
          </div>
        ))}
      </div>
  )
}

export default OnlineUsers