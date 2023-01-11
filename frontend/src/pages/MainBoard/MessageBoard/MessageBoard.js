import {useState} from 'react'

import MessageContents from './Message/MessageContents'
import MessageInput from './MessageInput'

import './MessageBoard.css'

const MessageBoard = (props) => {

  return (
    <div className="messageboard-container">
      <MessageContents
        
        />
      <MessageInput
        message={props.message}
        setMessage={props.setMessage}
        inputHandler={props.inputHandler}
        enterHandler={props.enterHandler}
      />
    </div>
  )
}

export default MessageBoard