const Conversation = require("../../models/Conversation")
const { getSocketIo, getOnlineUsers, getActiveConnections } = require("../../socketServerStore")


const updateChat = async(conversationId, receiverSocketId) => {
  const conversation = await Conversation.findById(conversationId)
    .populate({
      path:'messages',
      model:'Message',
      populate:{
        path:"author",
        model:"User",
        select:"username _id"
      }
  })

  if(conversation){
    const io = getSocketIo()
    conversation.participants.forEach(userId => {
      //search and retrieve for online user's socket ID in a conversation
      const activeConnections = getActiveConnections(userId.toString())
      // send the whole conversation to each participants
      activeConnections.forEach(socketId => {
          io.to(socketId).emit('direct-chat-history', {
          participants: conversation.participants,
          messages: conversation.messages
        })
      })
    })
  }
  
}

module.exports = {updateChat}