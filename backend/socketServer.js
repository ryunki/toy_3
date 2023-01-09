const jwt = require('jsonwebtoken')
// const authSocket = require('./middleware/authSocket');

const socketServer = (server) => {
  const io = require('socket.io')(server,{
    cors: {
      origin: 'http://localhost:3000'
    }
  });

  // io.use((socket,next)=>{
  //   authSocket(socket,next)
  // })

  const emitOnlineUsers = ({onlineUsers}) =>{
    // const onlineUsers = serverStore.getOnlineUsers()
    io.emit(
      'online-users', {onlineUsers}
    )
  }

  const connectedUsers = new Map()
  io.on('connection', (socket) =>{
    console.log('user connected')
    const token = socket.handshake.auth?.token 
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    socket.user = decoded
// saving online user's data to their socket id
    connectedUsers.set(socket.id, socket.user)
    const onlineUsers = []
    connectedUsers.forEach((value, key)=>{
      onlineUsers.push({
        socket: key,
        userData: value
      })
    })
    
// send list of online users to frontend
    emitOnlineUsers({onlineUsers})

// delete previous socket.id on refresh. this prevents from stacking socket.id on every refresh
    socket.on('disconnect', ()=>{
      if(connectedUsers.has(socket.id)){
        connectedUsers.delete(socket.id)
      }
    })
    
  }) 
}

module.exports = {
  socketServer
}
