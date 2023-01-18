
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChat } from '../../../../store/slices/chatSlice'

import './MessageContents.css'

const MessageContents = () => {
  const useChat = useRef()
  const dispatch = useDispatch()
  // const [messages, setMessages] = useState()
  const chat = useSelector(state => state.chat)

  useEffect(()=>{
      //save chat to redux
      dispatch(setChat(chat))
      console.log("REF:" , useChat.current)
      useChat.current?.scrollIntoView({ behavior: "smooth" })
  },[chat])
  
  return (

    <div 
      className="message-contents-container">
        {chat.messages && chat.messages.map((msg, idx)=>(
          <div key={msg._id}>
            <h5 key={msg._id}>{msg.content}</h5>
          </div>
        ))}
        {/* {messages} */}
      
      <div ref={useChat} />
    </div>
  )
}

export default MessageContents