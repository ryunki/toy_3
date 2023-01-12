import { useEffect, useState } from "react"

import MessageBoard from "./MainBoard/MessageBoard/MessageBoard"
import Header from "./MainBoard/Header"
import SideBar from "./MainBoard/SideBar/SideBar"
import { sendDirectMessage, socketConnection } from "../realtimeCommunication/socketConnection"
import { logout } from "../util/auth"

import { setUserData } from "../store/slices/userSlice"
import { useSelector, useDispatch } from 'react-redux'

import './MainBoard.css'


const MainBoard = () => {
  const dispatch = useDispatch()

  const [onlineUsers, setOnlineUsers] = useState([])
  const [message, setMessage] = useState("")
  const [beginChat, setBeginChat] = useState({})

  const userData = JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
    if(!userData){
      logout()
    } else {
      console.log(userData)
      dispatch(setUserData(userData))
      // setUserData(userData)
      socketConnection(userData, dispatch)
    }
  },[])
  
  const beginChatHandler = (socketId, receiverId, username) => {
    setBeginChat({username, socketId, receiverId})
  }

  const inputHandler = (e) => {
    const msg = e.target.value
    setMessage(msg)
  }

  const enterHandler = (e) => {
    if(e.key === "Enter"){
      const receiverInfo = beginChat
      sendDirectMessage({message, receiverInfo})
      setMessage("")
    }
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
          inputHandler={inputHandler}
          enterHandler={enterHandler}
        />
      </div>
    </div>

  )
}

export default MainBoard