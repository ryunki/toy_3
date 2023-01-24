import { useEffect, useState } from "react"

import MessageBoard from "./MainBoard/MessageBoard/MessageBoard"
import Header from "./MainBoard/Header"
import SideBar from "./MainBoard/SideBar/SideBar"
import { sendDirectMessage, socketConnection, getDirectChatHistory } from "../realtimeCommunication/socketConnection"
import { logout } from "../util/auth"

import { useDispatch } from 'react-redux'

import './MainBoard.css'
import { setUserData } from "../store/slices/userSlice"


const MainBoard = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const [beginChat, setBeginChat] = useState({})

  
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("user"))
    if(userData){
      // for evey refresh, user needs to be saved into redux 
      // (username (himself) becomes clickable)
      dispatch(setUserData(userData))
      // update online users 
      socketConnection(userData, dispatch)
    } else {
      logout()
    }
  },[])
  
  //when click on another user name
  const beginChatHandler = (socketId, receiverId, username) => {
    setBeginChat({username, socketId, receiverId})
    //get chat history when a target user is clicked
    getDirectChatHistory(receiverId)
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
          beginChat={beginChat}
        />
      </div>
    </div>

  )
}

export default MainBoard