
const authSocket = require('./middleware/authSocket');
const socketServerStore = require('./socketServerStore')

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
