import { useEffect, useState } from "react"

import MessageBoard from "./MainBoard/MessageBoard/MessageBoard"
import Header from "./MainBoard/Header"
import SideBar from "./MainBoard/SideBar/SideBar"
import { socketConnection } from "../realtimeCommunication/socketConnection"
import { logout } from "../util/auth"

import './MainBoard.css'


const MainBoard = () => {
  const [onlineUsers, setOnlineUsers] = useState([])
  const [message, setMessage] = useState("")
  const [beginChat, setBeginChat] = useState("")

  const userData = JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
    if(!userData){
      logout()
    } else {
      socketConnection(userData, setOnlineUsers)
    }
  },[])
  
  const beginChatHandler = (socketId, receiverId, username) => {
    setBeginChat(username)
  }
  
  return (
    <div className="mainboard-container">
      <SideBar 
        onlineUsers = {onlineUsers}
        userData = {userData}
        beginChatHandler = {beginChatHandler}
      />
      <div className="header-chat-container">
        <Header 
          beginChat={beginChat}
        />
        <MessageBoard
          message={message}
          setMessage={setMessage}
        />
      </div>
    </div>

  )
}

export default MainBoard