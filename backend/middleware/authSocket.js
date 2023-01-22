const jwt = require('jsonwebtoken')

const authSocket = (socket, next) => { 
  const token = socket.handshake.auth?.token 
    try{
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      socket.user = decoded
      console.log("-------------AUTH SOCKET: ---------------",socket.user)
    }catch(err){ //when token is expired
      const socketError = new Error("NOT_AUTHORIZED")
      console.log(socketError)
      return next(socketError)
    }
  next()
  
}

module.exports = authSocket