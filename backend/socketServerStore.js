const connectedUsers = new Map()
let io = null

const setSocketIo = (ioInstance) => {
  io = ioInstance
}
const getSocketIo = () => {
  return io
}

// adding new user to the list
const addNewConnectedUser = (socket) => {
  connectedUsers.set(socket.id, socket.user)
  console.log("new connected users:: ", connectedUsers)
}

// used for displaying online/offline users
const getOnlineUsers = () => {
  const onlineUsers = []
  connectedUsers.forEach((value, key)=>{
    onlineUsers.push({
      socket: key,
      userData: value
    })
  })
  console.log("ONLINE users ::: ", onlineUsers)
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
  addNewConnectedUser,
  getOnlineUsers,
  getActiveConnections,
  removeConnectedUser,
}
