import {logout} from '../../util/auth'

import './Header.css'

const Header = ({beginChat}) => {
  return (
    <div className="header-container">
      <div>
        {beginChat.username ? 
          <h3>
            {"send message to " + beginChat.username}
          </h3>
          : <h3>Click on name to start a chat</h3>}
      </div>
      <button onClick={logout}>logout</button>
    </div>

)
}

export default Header