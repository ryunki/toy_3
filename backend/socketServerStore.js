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
  return onlineUsers
}

const getActiveConnections = (userId) => {
  const activeConnections = []
// key is a socketID, value is a userData
  connectedUsers.forEach((value, key) => {
    if(userId === value._id)
      activeConnections.push(key)
  })
  return activeConnections
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
  getActiveConnections,
}
