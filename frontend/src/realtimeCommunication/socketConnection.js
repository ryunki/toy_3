import io from "socket.io-client"

let socket = null


export const socketConnection = (userData) => {
  const token = userData.token
  socket = io("http://localhost:5000",{
    auth:{
      token
    }
  });
  socket.on('connect', ()=>{
    console.log('successfully connected with socket.io server')
  })

  // socket.on("connect", () => {
  //   console.log("successfully connected with socket.io server")   
  // })

}
