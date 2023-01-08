import MessageBoard from "./MainBoard/MessageBoard/MessageBoard"
import Header from "./MainBoard/Header"
import SideBar from "./MainBoard/SideBar/SideBar"
import { socketConnection } from "../realtimeCommunication/socketConnection"

import './MainBoard.css'
import { useEffect } from "react"
import { logout } from "../util/auth"

const MainBoard = () => {

  useEffect(()=>{
    const userData = localStorage.getItem("user")
    if(!userData){
      logout()
    } else {
      socketConnection(JSON.parse(userData))
    }
  },[])
  
  return (
    <div className="mainboard-container">
      <SideBar/>
      <div className="header-chat-container">
        <Header/>
        <MessageBoard/>
      </div>
    </div>

  )
}

export default MainBoard