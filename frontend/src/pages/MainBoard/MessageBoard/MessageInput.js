
import { sendDirectMessage } from '../../../realtimeCommunication/socketConnection'

import './MessageInput.css'

const MessageInput = ({message, setMessage, inputHandler, enterHandler}) => {

  
  return (
    <div className="input-wrapper">
      <input className="input"
        value={message}
        onChange={inputHandler} 
        onKeyDown={enterHandler}
      />
    </div>
  )
}

export default MessageInput