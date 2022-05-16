var mongoose = require('mongoose');
var schema = mongoose.Schema;


var bookSchema = new schema({
    name:String,
    title:String,
    description:String,
    page:Number,
    category:[{type:schema.Types.ObjectId,ref:"Category"}],
    commentID:[{type:schema.Types.ObjectId,ref:"Comment"}],
    tags:[String]

},{timestamps:true})



var Book = mongoose.model('Book',bookSchema)
module.exports=Book;