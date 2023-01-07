import MessageBoard from "./MainBoard/MessageBoard/MessageBoard"
import Header from "./MainBoard/Header"
import SideBar from "./MainBoard/SideBar/SideBar"

import './MainBoard.css'

const MainBoard = () => {
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