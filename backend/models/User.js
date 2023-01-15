const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username:{ type:String, required:true},
  email:{ type:String, unique:true, required:true}, //"unique:true" create index for email. simply speeds up for query process
  password:{ type:String, required:true},
  friends:[{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  createdAt:{type:Date, default:Date.now},
  deletedAt:{type:Date}
})

const User = mongoose.model('User', userSchema)

module.exports = User