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

  const onlineUsers = new Map()
  io.on('connection', (socket) =>{
    console.log('user connected')
    const token = socket.handshake.auth?.token 
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    socket.user = decoded
// saving online user's data to their socket id
    onlineUsers.set(socket.id, socket.user)
    
// delete previous socket.id on refresh. this prevents from stacking socket.id on every refresh
    socket.on('disconnect', ()=>{
      if(onlineUsers.has(socket.id)){
        onlineUsers.delete(socket.id)
      }
    })
    console.log(onlineUsers)
  })
}

module.exports = {
  socketServer
}
