import io from "socket.io-client"

let socket = null

export const socketConnection = (userData, setOnlineUsers) => {
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
    setOnlineUsers(onlineUsers)
  })
}

export const sendDirectMessage = ({message, receiverInfo}) => {
  socket.emit('direct-message', message, receiverInfo)
}

