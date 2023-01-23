const socketServerStore = require('./socketServerStore')
const authSocket = require('./middleware/authSocket');

const directMessageHandler = require('./socketHandlers/directMessageHandler');
const getDirectChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');

const socketServer = async(server) => {
  const io = require('socket.io')(server,{
    cors: {
      // origin: 'http://localhost:3000'
      origin: '*'
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
    emitOnlineUsers(socket)

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
  },[10000])

  // emit current online users list to client
  function emitOnlineUsers(socket) {
    //whenever a new socket is connected (a user logged in)
    if(socket){
      // remove duplicate user in the online user list for frontend
      socketServerStore.removeDuplicateUser(socket)
    }
    console.log("------------updated online users------------")
    const onlineUsers = socketServerStore.getOnlineUsers()
    io.emit('online-users', {onlineUsers})
  }
}

module.exports = {
  socketServer
}
