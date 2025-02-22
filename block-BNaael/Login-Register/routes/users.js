var express = require('express');
var router = express.Router();


var User = require('../modals/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register' , async (req,res,next)=>{
  try{
    var user = await User.create(req.body);
    console.log(user);
    var token = await user.signToken();
    res.status(200).json({user:user.userJson(token)})
  }catch(error){
    next(error);
  }
})




router.post('/login', async (req,res,next)=>{
  var {email ,password} = req.body;
  if(!email || !password){
  return res.status(400).json({error:"Email/password is required"})
  }
  try{
    var user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Email is not registerd"});
    }
    var result = await user.verifypassword(password);
    if(!result){
      return res.status(400).json({error:"Password is incorrect "});
    }
var token = await user.signToken();
res.json({user:user.userJson(token)});
  }catch(error){
    next(error);
  }

})


module.exports = router;
