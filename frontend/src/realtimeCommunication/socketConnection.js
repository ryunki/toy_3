
import io from "socket.io-client"
import MessageContents from "../pages/MainBoard/MessageBoard/Message/MessageContents";
import {setOnlineUsers} from "../store/slices/onlineSlice";
import { chatUpdate } from "../util/chatUpdate";

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
    console.log(onlineUsers)
    // setOnlineUsers(onlineUsers)
    dispatch(setOnlineUsers(onlineUsers))
  })

  socket.on('direct-chat-history', (data) => {
    chatUpdate(data)
  })
}

export const sendDirectMessage = ({message, receiverInfo}) => {
  socket.emit('direct-message', message, receiverInfo)
}



