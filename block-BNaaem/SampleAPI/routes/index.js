var express = require('express');
var router = express.Router();


var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/dashboard',auth.verifyToken,(req,res)=>{
  res.json({access:"protected resources"})
})


router.get('/keep',(req,res)=>{
  res.status(200).json({access:"You are keep login "});
})
module.exports = router;
