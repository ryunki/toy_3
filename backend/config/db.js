const mongoose = require('mongoose')

const connectDB = async() => {
  mongoose.set('strictQuery', true);
  try{
    await mongoose.connect(process.env.MONGO_DB)
    console.log("MongoDB connection SUCCESS")
  } catch (err){
    console.log("MongoDB connection FAILED")
    process.exit(1);
  }
}

module.exports = connectDB