

import './MessageInput.css'

const MessageInput = ({message, setMessage}) => {

  const inputHandler = (e) => {
    setMessage(e.target.value)
  }

  const enterHandler = (e) => {
    if(e.key === "Enter"){
      console.log(message)
      setMessage("")
    }
  }
  
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