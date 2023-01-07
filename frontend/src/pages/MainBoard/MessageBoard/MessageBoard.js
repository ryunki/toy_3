import {useState} from 'react'

import MessageContents from './Message/MessageContents'
import MessageInput from './MessageInput'

import './MessageBoard.css'

const Chat = () => {
  const [message, setMessage] = useState("")

  return (
    <div className="messageboard-container">
      <MessageContents
        
      />
      <MessageInput
        message={message}
        setMessage={setMessage}
      />
    </div>
  )
}

export default Chat