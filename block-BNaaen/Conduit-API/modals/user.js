var mongoose = require('mongoose');
var schema = mongoose.Schema;

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var userSchema = new schema({
    username: String,
    email: { type: String, unique: true },
    password: { type: String, minlength: 5, required: true },
    bio:String,
    image:String,
    following: Boolean,
    followingList: [{ type: schema.Types.ObjectId, ref: 'User' }],
    followersList: [{ type: schema.Types.ObjectId, ref: 'User' }],

}, {
    timestamps: true,
})




userSchema.pre('save', async function (next) {

    console.log(this, 'This in the pre')

    try {
        if (this.password && this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);

        }
        next()
    } catch (error) {
        return next(error)
    }


})



userSchema.methods.verifypassword = async function (password, cb) {
    try{

        var result = await bcrypt.compare(password, this.password)
        console.log(result)
        return result;
    }catch(error){
        return error;
    }

}

userSchema.methods.signToken = async function(){
    var payload = {userId: this.id,email:this.email}
    try {
        var token = await jwt.sign(payload,"thisisasecret");
        return token;
    } catch (error) {
        return error
    }

}


userSchema.methods.userJson = function(token){
    return{
        username :this.name,
        email:this.email,
        bio:this.bio,
        image:this.image,
        token:token
    }
}



userSchema.methods.displayUser = function (id = null) {
    return {
      username: this.username,
      email: this.email,
      bio: this.bio,
      image: this.image,
      following: id ? this.followersList.includes(id) : false,
    };
  };


var User = mongoose.model('User', userSchema);
module.exports = User;