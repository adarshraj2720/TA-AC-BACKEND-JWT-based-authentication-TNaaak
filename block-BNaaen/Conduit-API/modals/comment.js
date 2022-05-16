let mongoose = require('mongoose');
let schema = mongoose.Schema;

let commentSchema = new schema(
  {
    body: { type: String, required: true },
    articleId: { type: schema.Types.ObjectId, ref: 'Article', required: true },
    author: { type: schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

commentSchema.methods.commentdisplay = function (id = null) {
  return {
    id: this.id,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author.displayUser(id),
  };
};

var Comment = mongoose.model('Comment', commentSchema);
module.exports= Comment;