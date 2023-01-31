
import { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChat } from '../../../../store/slices/chatSlice'

import './MessageContents.css'

const MessageContents = () => {
  const useChat = useRef()

  const user = useSelector(state => state.user)
  const chat = useSelector(state => state.chat)

  useEffect(()=>{
      useChat.current?.scrollIntoView({ behavior: "smooth" })
  },[chat])

  // draw date separator
  const dateSeparator = (item, idx) =>{
    const date = item.split('T')[0]
    let x = {}
    if(idx > 0 ){ // starting from second message. compare date from the previous message
      const previousDate = chat.messages[idx-1].date.split('T')[0]
      if (date !== previousDate){
        return true
      }
    }else{  // very first message
      return true
    }
  }
  
  // extract hour and minutes only
  const displayTime = (item) => {
    const time = item.split('T')[1].split('.')[0].slice(0,-3)
    return time
  }

  // remove repeated usernames except the first message
  const compareUsername = (item, idx) => {
    if(idx > 0){
      const previousUsername = chat.messages[idx-1].author.username
      // compare current username to the previous one
      if(item !== previousUsername)
      return item
    }else{
      return item
    }

  }

  return (

    <div 
      className="message-contents-container">
        {chat.messages && chat.messages.map((item, idx)=>
          // {state.user.username === item.author.username ? (
              <div key={item._id} >
                <div style={{textAlign: "center"}}>
                    {dateSeparator(item.date, idx) && item.date.split('T')[0]}
                </div>
                <div style={
                  {textAlign: user.username === item.author.username ? "right" : "left"}
                  }>
                  {/* <h4>{item.author.username}</h4> */}
                  <h4>{compareUsername(item.author.username, idx)}</h4>
                  <div style={
                  {
                    justifyContent: user.username === item.author.username ? "end" : "start",
                    display:"flex"
                  }
                  }>
                    {user.username === item.author.username ?(
                      <>
                        <div style={{fontSize:"8px", margin: "1em"}}>{displayTime(item.date)}</div>
                        <div>{item.content}</div>
                      </>
                    ):(
                      <>
                        <div>{item.content}</div>
                        <div style={{fontSize:"8px", margin: "1em"}}>{displayTime(item.date)}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
          )}
      
      <div ref={useChat} />
    </div>
  )
}

export default MessageContents