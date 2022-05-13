var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var userSchema = new schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, minlength: 5, required: true }

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
        return result;
    }catch(error){
        return error;
    }

}




var User = mongoose.model('User', userSchema);
module.exports = User;