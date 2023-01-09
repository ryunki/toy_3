const connectedUsers = new Map()
let io = null

const setSocketIo = (ioInstance) => {
  io = ioInstance
}
const getSocketIo = () => {
  return io
}

const getOnlineUsers = (socket) => {
  // saving online user's data to their socket id
  connectedUsers.set(socket.id, socket.user)
  const onlineUsers = []
  connectedUsers.forEach((value, key)=>{
    onlineUsers.push({
      socket: key,
      userData: value
    })
  })
  // return onlineUsers
  console.log(onlineUsers)
  io.emit('online-users', {onlineUsers})
}

const removeConnectedUser = (socket) => {
  if(connectedUsers.has(socket.id)){
    connectedUsers.delete(socket.id)
  }
}


module.exports = {
  setSocketIo,
  getSocketIo,
  getOnlineUsers,
  removeConnectedUser,
}
