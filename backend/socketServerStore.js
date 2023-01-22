//online user list for frontend. no duplicate users are stored here
const connectedUsers = new Map()

//online user list for backend. store duplicate users (users logged in from different browser)
//this is for emitting sent messages to the same user in another browser.
//without this, message will show only for the one who typed.
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
  if(connectedUsersCopy.has(socket.id)){
    connectedUsersCopy.delete(socket.id)
    if(connectedUsers.has(socket.id)){
      connectedUsers.delete(socket.id)
    }
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
