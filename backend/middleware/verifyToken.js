const jwt = require('jsonwebtoken')

const config = process.env

const verifyToken = async(req,res,next)=>{
  let token = req.body.token || req.query.token || req.headers['authorization']
 
  if (!token){
    return res.status(403).send('A token is required for authentication') // status 403 is forbidden
  }
  try{
    token=token.replace(/^Bearer\s+/,"")
    const decoded = await jwt.verify(token, config.JWT_KEY)
    req.user = decoded
  }catch(err){
    return res.status(401).send('Invalid Token')
  }

  return next()
}

module.exports = verifyToken