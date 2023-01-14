import {useState, useEffect} from 'react'

import MessageContents from './Message/MessageContents'
import MessageInput from './MessageInput'
import WelcomeMessage from './WelcomeMessage'

import './MessageBoard.css'

const MessageBoard = (props) => {
  const [disableInput, setDisableInput] = useState()

  useEffect(()=>{
    console.log(props.beginChat.username)
    if(props.beginChat.username){
      setDisableInput(false)
    }else{
      setDisableInput(true)
    }
    
  },[props.beginChat.username])
  return (
    <div className="messageboard-container">
      {!disableInput ? (
        <MessageContents
          beginChat={props.beginChat}
          />
        ) : (
          <WelcomeMessage/>
        )
      }
      <MessageInput
        message={props.message}
        setMessage={props.setMessage}
        inputHandler={props.inputHandler}
        enterHandler={props.enterHandler}
        disableInput={disableInput}
      />
    </div>
  )
}

export default MessageBoard