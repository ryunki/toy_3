
import io from "socket.io-client"

import {setOnlineUsers} from "../store/slices/onlineSlice";
import {setChat} from "../store/slices/chatSlice";


let socket = null

export const socketConnection = (userData, dispatch) => {
  
  const token = userData.token
  socket = io("http://localhost:5000",{
    auth:{
      token
    }
  });
  socket.on('connect', ()=>{
    console.log('successfully connected with socket.io server')
  })

  socket.on('online-users', ({onlineUsers}) => {
    console.log('listening to online-users event...: ',onlineUsers)
    // setOnlineUsers(onlineUsers)
    dispatch(setOnlineUsers(onlineUsers))
  })

  // the targeted user receives message from this
  socket.on('direct-chat-history', (data) => {
    dispatch(setChat(data))
  })
}

// send message from sender to targeted user
export const sendDirectMessage = ({message, receiverInfo}) => {
  socket.emit('direct-message', message, receiverInfo)
}

export const getDirectChatHistory = (receiverId) =>{
  // send target user ID to server
  socket.emit('direct-chat-history', receiverId)
}


