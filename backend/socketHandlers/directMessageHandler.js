const Conversation = require('../models/Conversation');
const Message = require('../models/Message')


const directMessageHandler = async (socket, message, receiverInfo) => {
  try{
    // console.log(socket);
    // console.log(message);
    // console.log(receiverInfo);
    const senderId = socket.user._id
    const receiverId = receiverInfo.receiverId
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
    }else{
      const newConversation = await Conversation.create({
        participants:[senderId, receiverId],
        messages: [sentMessage._id]
      })
    }
  

  }catch(err){
    console.log(err)
  }
};

module.exports = directMessageHandler;
