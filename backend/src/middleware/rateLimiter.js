const ratelimit = require('../config/upstash');
const rateLimiter  = async (req,res,next)=>{
  try{
      const {success}  = await ratelimit.limit('my-limit-key');
      if(!success){
        return res.status(429).json({msg:'Too many requests, please try again later.'})
      }
  }catch(err){
      res.status(500).json({msg:'Server error'})
      next(err)
  }
}

module.exports = rateLimiter;