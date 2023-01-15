const Conversation = require("../models/Conversation")
const { getSocketIo } = require("../socketServerStore")

const { updateChat } = require("./updates/chat")

const directChatHistoryHandler = async(socket, receiverId) =>{

  const senderId = socket.user._id
  try{
    const conversation = await Conversation.findOne({
      participants: {$all:[senderId, receiverId]}
    })
    console.log("conversation found?...")
    if(conversation){
      console.log("*yes")
      // initial update of conversation when target user is clicked
      // this socket.id is for the user who clicked the target user
      updateChat(conversation._id.toString(), socket.id)
    }
    else{
      console.log("*no")
      const io = getSocketIo()
      io.to(socket.id).emit('direct-chat-history', {
        participants:[],
        messages:[]
      })
    }
  }catch(err){
    console.log(err)
  }

}

module.exports = directChatHistoryHandler