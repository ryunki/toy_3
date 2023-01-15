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
    
    socketServerStore.addNewConnectedUser(socket)

// send list of online users to frontend
    emitOnlineUsers()

// receive message from client
    socket.on('direct-message',(message, receiverInfo)=>{
      directMessageHandler(socket, message, receiverInfo)
    })

    
// request from client to get chat history 
    socket.on('direct-chat-history',(receiverId)=>{
      console.log('listening on direct-chat-history event...')
      getDirectChatHistoryHandler(socket, receiverId)
    })
// delete previous socket.id on refresh. this prevents from stacking new socket.id on every refresh
    socket.on('disconnect', ()=>{
      console.log("disconnect from socket...")
      socketServerStore.removeConnectedUser(socket)
    })
  })

  //outside of io connection event
  //emit online users for every 8 seconds
  setInterval(()=>{
    emitOnlineUsers()
  },[8000])

  // emit current online users list to client
  function emitOnlineUsers() {
    const onlineUsers = socketServerStore.getOnlineUsers()
    io.emit('online-users', {onlineUsers})
  }
}

module.exports = {
  socketServer
}
