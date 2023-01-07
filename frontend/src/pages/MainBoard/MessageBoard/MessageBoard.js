
import MessageContents from './Message/MessageContents'
import MessageInput from './MessageInput'

import './MessageBoard.css'

const Chat = () => {
  return (
    <div className="messageboard-container">
      <MessageContents/>
      <MessageInput/>
    </div>
  )
}

export default Chat