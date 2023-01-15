const Conversation = require("../../models/Conversation")
const { getSocketIo, getOnlineUsers, getActiveConnections } = require("../../socketServerStore")


const updateChat = async(conversationId, receiverSocketId = null) => {
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
      //initial update of chat history. when click on a target user
      if(receiverSocketId) {
        console.log("when clicked on a target user to begin a chat...")
        return io.to(receiverSocketId).emit('direct-chat-history',{
          participants: conversation.participants,
          messages: conversation.messages
        })
      }
    
    
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