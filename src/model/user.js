const mongoose = require('mongoose');
var validator = require('validator');

const userSchema = new mongoose.Schema({
firstName: { type: String, required: true, trim: true },
lastName: { type: String, required: true},
email: { type: String, required: true, unique: [true,"Email already exists!"], validate:{
    validator:(email)=> validator.isEmail(email),
    message: 'Invalid email format'
}},
    password: {
        type: String, required: true, validate: {
    validator:(password)=> validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    message: 'Password is not strong enough'
} },
city: { type: String },
}, {
    timestamps:true
});

const User = mongoose.model('User', userSchema);
  
module.exports = User;