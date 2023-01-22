const User = require("../../models/User")

const getAllUsers = async (req,res)=>{
  try{
    const users = await User.find({},'username')
    console.log("USERS from DB-------------",users)
    return res.send(users)
  }catch(err){
    return res.send(err)
  }
}

module.exports = getAllUsers