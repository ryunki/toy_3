
import './MessageInput.css'

const MessageInput = ({message, inputHandler, enterHandler, disableInput}) => {

  
  return (
    <div className="input-wrapper">
      <input className="input"
        value={message}
        onChange={inputHandler} 
        onKeyDown={enterHandler}
        disabled={disableInput}
      />
    </div>
  )
}

export default MessageInput