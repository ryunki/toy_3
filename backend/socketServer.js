const jwt = require('jsonwebtoken')
// const authSocket = require('./middleware/authSocket');
const socketServerStore = require('./socketServerStore')

const socketServer = (server) => {
  const io = require('socket.io')(server,{
    cors: {
      origin: 'http://localhost:3000'
    }
  });

  // io.use((socket,next)=>{
  //   authSocket(socket,next)
  // })

  const emitOnlineUsers = (socket) =>{
    const onlineUsers = socketServerStore.getOnlineUsers(socket)
    io.emit(
      'online-users', {onlineUsers}
    )
  }

  socketServerStore.setSocketIo(io)
  
  io.on('connection', (socket) =>{
    console.log('user connected')
    const token = socket.handshake.auth?.token 
    try{
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      socket.user = decoded
    }catch(err){
      console.log(err)
    }
    
// send list of online users to frontend
    socketServerStore.getOnlineUsers(socket)

// delete previous socket.id on refresh. this prevents from stacking new socket.id on every refresh
    socket.on('disconnect', ()=>{
      socketServerStore.removeConnectedUser(socket)
    })
  })
}

module.exports = {
  socketServer
}
