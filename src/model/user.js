const mongoose = require('mongoose');
var validator = require('validator');

const userSchema = new mongoose.Schema({
firstName: { type: String, required: true, trim: true },
lastName: { type: String, required: true},
email: { type: String, required: true, unique: [true,"Email already exists!"], validate:{
    validator:(email)=> validator.isEmail(email),
    message: 'Invalid email format'
}},
password: {type: String, required: true},
city: { type: String },
}, {
    timestamps:true
});

const User = mongoose.model('User', userSchema);
  
module.exports = User;