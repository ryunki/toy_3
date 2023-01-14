const Conversation = require("../models/Conversation")
const { updateChat } = require("./updates/chat")

const directChatHistoryHandler = async(socket, receiverId) =>{
  const senderId = socket.user._id
  try{
    const conversation = await Conversation.findOne({
      participants: {$all:[senderId, receiverId]}
    })
    if(conversation){
      // initial update of conversation when target user is clicked
      // this socket.id is for the user who clicked the target user
      updateChat(conversation._id.toString(), socket.id)
    }
  }catch(err){
    console.log(err)
  }

}

module.exports = directChatHistoryHandler