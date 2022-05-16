var express = require('express');
var router = express.Router();

var Book = require('../modals/book')

var Comment = require('../modals/comment')


var auth = require('../middlewares/auth')
//v2

router.get('/',(req,res,next)=>{
    Book.find({},(err,books)=>{
        if(err) return res.status(500).json(err);
        res.json({books})
    })
})

router.get('/:id',(req,res,next)=>{
    var id = req.params.id;
    Book.findById(id,(err,book)=>{
        if(err) return res.status(500).json(err);
        res.json({book})
    })
})

router.post('/', auth.verifyToken,(req,res,next)=>{
    Book.create(req.body,(err,books)=>{
        if(err) return res.status(500).json(err)
        res.json({books})
    })
})



router.put('/:id',(req,res,next)=>{
    var id = req.params.id;
    Book.findByIdAndUpdate(id,(err,update)=>{
        if(err) return res.status(500).json(err);
        res.json({update});
    })
})

router.get('/:id/delete',(req,res,next)=>{
    Book.findByIdAndDelete(id,(err,dele)=>{
        if(err) return res.status(500).json(err);
        res.json({dele});
    })
})



//comment


router.post('/:id/comment',(req,res,next)=>{
    var id = req.params.id;
    req.body.bookID = bookID
    Comment.create(req.body,(err,comments)=>{
        if(err) return res.status(500).json(err)
        Book.findByIdAndUpdate(id,{$push:{commentID:comments.id}},(err,book)=>{
            if(err) return res.status(500).json(err);
            res.statusCode(200).json({comments})
        })
        
    })
})



router.put('/comment/:id/edit',(req,res,next)=>{
    var id = req.params.id;
    Comment.findByIdAndUpdate(id,(err,update)=>{
        if(err) return res.status(500).json(err);
        res.json({update});
    })
})




router.get('/comment/:id/delete',(req,res,next)=>{
    var id = req.params.id;
    Comment.findByIdAndDelete(id,(err,delecom)=>{
        if(err) return res.status(500).json(err);
        res.json({delecom});
    })
})




router.get('/comment',(req,res,next)=>{
    Comment.find({},(err,comments)=>{
        if(err) return res.status(500).json(err);
        res.json({comments})
    })
})


module.exports = router;