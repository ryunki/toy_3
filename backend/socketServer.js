const authSocket = require('./middleware/authSocket');
const socketServerStore = require('./socketServerStore')

const directMessageHandler = require('./socketHandlers/directMessageHandler');
const getDirectChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');

const socketServer = (server) => {
  const io = require('socket.io')(server,{
    cors: {
      origin: 'http://localhost:3000'
    }
  });

  //check token validity and decode token
  io.use((socket,next)=>{
    authSocket(socket,next)
  })

  socketServerStore.setSocketIo(io)
  
  io.on('connection', (socket) =>{
    console.log('user connected')
    
    // send list of online users to frontend
    const onlineUsers = socketServerStore.getOnlineUsers(socket)
    io.emit('online-users', {onlineUsers})

// receive message from client
    socket.on('direct-message',(message, receiverInfo)=>{
      directMessageHandler(socket, message, receiverInfo)
    })

    // request from client to get chat history 
    socket.on('direct-chat-history',(receiverId)=>{
      console.log("listen to direct-chat-history")
      getDirectChatHistoryHandler(socket, receiverId)
    })
// delete previous socket.id on refresh. this prevents from stacking new socket.id on every refresh
    socket.on('disconnect', ()=>{
      socketServerStore.removeConnectedUser(socket)
    })
  })
}

module.exports = {
  socketServer
}
