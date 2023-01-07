import {logout} from '../../util/auth'

import './Header.css'

const Header = () => {
  return (
    <div className="header-container">
      <button onClick={logout}>logout</button>
    </div>

)
}

export default Header