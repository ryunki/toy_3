import {logout} from '../../util/auth'

import './Header.css'

const Header = ({beginChat}) => {
  return (
    <div className="header-container">
      <div>
        {beginChat ? 
          "send message to " + beginChat 
          : <>Click on name to start a chat</>}
      </div>
      <button onClick={logout}>logout</button>
    </div>

)
}

export default Header