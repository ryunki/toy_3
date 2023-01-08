const jwt = require('jsonwebtoken')

const socketServer = (server) => {
  const io = require('socket.io')(server,{
    cors: {
      origin: 'http://localhost:3000'
    }
  });

  io.use((socket,next) => {
    const token = socket.handshake.auth?.token 
    try{
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      socket.user = decoded
    }catch(err){
      return console.log(err)
    }
    next()
  })

  const onlineUsers = []
  io.on('connection', (socket) =>{
    console.log('user connected')
    console.log(socket.id)
    console.log(socket.user)
  })
}

module.exports = {
  socketServer
}
