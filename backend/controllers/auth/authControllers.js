const bcrypt = require("bcryptjs");
const { findOne } = require("../../models/User");

const User = require('../../models/User')

const registerUser = async(req,res,next) => {
  const {username, email, password} = req.body
  if( !( username && email && password ) ){
    return res.status(422).send('All inputs are required')
  }
  let createdUser
  try{
    const userExists = await User.exists({ email })
    if(userExists){
      return res.status(403).send('User exists')
    }else{
      const hashedPassword = bcrypt.hashSync(password, 12)
      createdUser = await User.create({
        username, 
        email: email.toLowerCase(), 
        password: hashedPassword
      })
    }
  }catch(err){
    return res.status(500).send("Could not register. Please try again")
  }

  res.status(201).json({
    userCreated:{
      _id:createdUser._id,
      username,
      email: email.toLowerCase(), 
    }
  })
}

const loginUser = async(req,res,next) => {
  try{
    const {email, password} = req.body
    const existingUser = await User.findOne({email})
    if (!existingUser) {
      return res.status(403).send("Invalid credentials, could not log you in")
    } else if (bcrypt.compareSync(password, existingUser.password)){
      return res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      })
    }else{
      return res.status(401).send("Wrong credentials")
    }
  } catch(err){
    return res.status(500).send("Login failed. please try again")
  }
}

module.exports = {
  registerUser,
  loginUser
}