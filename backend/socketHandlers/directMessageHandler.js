const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { updateChat } = require('./updates/chat');


const directMessageHandler = async (socket, message, receiverInfo) => {
  try{
    const senderId = socket.user._id
    const receiverId = receiverInfo.receiverId
    const receiverSocketId = receiverInfo.socketId
    //create new message
    const sentMessage = await Message.create({
      author: senderId,
      content: message,
      date: new Date()
    })

    const existingConvo = await Conversation.findOne({
      participants:{$all: [senderId, receiverId]}
    })
    if(existingConvo){
      existingConvo.messages.push(sentMessage._id)
      await existingConvo.save()

      //update chat to client
      updateChat(existingConvo._id, receiverSocketId)
    }else{
      const newConversation = await Conversation.create({
        participants:[senderId, receiverId],
        messages: [sentMessage._id]
      })
      
      //update chat to client
      updateChat(newConversation._id, receiverSocketId)
    }
  

  }catch(err){
    console.log(err)
  }
};

module.exports = directMessageHandler;
