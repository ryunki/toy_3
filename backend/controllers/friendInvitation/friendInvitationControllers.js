const FriendInvitation = require("../../models/friendInvitation");



const inviteUser = async(req, res, next) => {
  try {
    const {senderId, receiverId, targetMail} = req.body
    const invitationExists = await FriendInvitation.find({
      senderId,
      receiverId
    })
    if(invitationExists){
      return res.send("Invitation already sent")
    }
    const user = await FriendInvitation.create({
      senderId,
      receiverId
    })

  } catch (err) {

  }
};

const acceptInvitation = async(req, res, next) => {
  try {

  } catch (err) {

  }
};

const rejectInvitation = async(req, res, next) => {
  try {

  } catch (err) {

  }
};

module.exports = {
  inviteUser,
  acceptInvitation,
  rejectInvitation
}
