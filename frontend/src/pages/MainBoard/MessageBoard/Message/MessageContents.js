
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChat } from '../../../../store/slices/chatSlice'

import './MessageContents.css'

const MessageContents = () => {
  const dispatch = useDispatch()
  // const [messages, setMessages] = useState()
  const chat = useSelector(state => state.chat)

  useEffect(()=>{
      //save chat to redux
      dispatch(setChat(chat))
  },[chat])
  
  return (

    <div className="message-contents-container">
      <h5>
        {chat.messages && chat.messages.map((msg, idx)=>(
          <div key={msg._id}>
            <h5 key={msg._id}>{msg.content}</h5>
          </div>
        ))}
        {/* {messages} */}
      </h5>
    </div>
  )
}

export default MessageContents