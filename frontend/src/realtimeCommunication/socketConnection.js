
import io from "socket.io-client"

import {setOnlineUsers} from "../store/slices/onlineSlice";
import {setChat} from "../store/slices/chatSlice";

import { setNotification } from "../store/slices/notificationSlice";
import { updateDirectChatHistoryIfActive } from "../util/chat";

let socket = null

export const socketConnection = (userData, dispatch) => {
  
  const token = userData.token
  // this is for browser
  // socket = io("http://localhost:5000",{
  //this works for mobile phone and brower
  socket = io("http://192.168.0.5:5000",{
    auth:{
      token
    }
  });
  socket.on('connection', ()=>{
    console.log('successfully connected with socket.io server')
  })

  socket.on('online-users', ({onlineUsers}) => {
    console.log('listening to online-users event...: ',onlineUsers)
    // setOnlineUsers(onlineUsers)
    dispatch(setOnlineUsers(onlineUsers))
  })

  // the targeted user receives message from this
  socket.on('direct-chat-history', (data) => {
    console.log("received a new chat------------")

    // const chat = useSelector(state => state.chat)
    // const userId = useSelector(state => state.user._id)
    // updateDirectChatHistoryIfActive(data, dispatch)
    dispatch(setChat(data))


    //******************************************* */
    // send logged in user's ID and the participants in a newly received chat to redux
    // dispatch(setNotification({
    //   participants: data.participants, 
    //   conversationId: data.conversationId,
    //   userId: userData._id
    // }))
  })
}

// send message from sender to targeted user
export const sendDirectMessage = ({message, receiverInfo}) => {
  socket.emit('direct-message', message, receiverInfo)
}

export const getDirectChatHistory = (receiverId) =>{
  // send target user ID to server, when click on a target username
  console.log("getDirectChatHistory-------------")
  socket.emit('direct-chat-history', receiverId)
}


