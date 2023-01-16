const connectedUsers = new Map()
const connectedUsersCopy = new Map()

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
  connectedUsersCopy.set(socket.id, socket.user)

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

// replace an existing user's socket to a current one 
const removeDuplicateUser = (socket) => {
  const newConnectedUsers = new Map(connectedUsers)
  newConnectedUsers.forEach((user, socketId) => {
    //check if a new logged in user already exists in the online list
    if(user._id === socket.user._id){
      console.log("duplicate user exists")
      //replace with a new socket
      connectedUsers.delete(socketId)
      connectedUsers.set(socket.id, socket.user)
    }
  })
  console.log(connectedUsersCopy)
}

const getActiveConnections = (userId) => {
  const activeConnections = []
// key is a socketID, value is a userData
connectedUsersCopy.forEach((value, key) => {
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
  removeDuplicateUser,
  getActiveConnections,
  removeConnectedUser,
}
