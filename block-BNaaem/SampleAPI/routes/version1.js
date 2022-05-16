var express = require('express');
var router = express.Router();

var Book = require('../modals/book')

var Category = require('../modals/category');


var auth = require('../middlewares/auth');



//find

router.get('/',(req,res,next)=>{
    Book.find({}).populate('Category').exec((err,books)=>{
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


//create
router.post('/', auth.verifyToken,(req,res,next)=>{
    let Categoryname =req.body.category 
    req.body.category =[];
    let tag = req.body.tag
    req.body.tag  = tag;

    
    Book.create(req.body,(err,books)=>{
        Category.create({name : Categoryname,bookID:book.id},(err,category)=>{
            if(err) return res.status(500).json(err)
            Book.findByIdAndUpdate(book.id,{$push:{category:category.id}},(err,book)=>{
                if(err) return res.status(500).json(err)

                res.json({book})
            })         
        })

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




module.exports=router;