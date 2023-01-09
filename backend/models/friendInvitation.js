const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendInvitationSchema = new Schema({
  sender:{
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  receiver:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }

})

module.exports = new mongoose.model('FriendInvitation', friendInvitationSchema)

