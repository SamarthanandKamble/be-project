const User = require("../model/user");
const bcrypt = require('bcrypt');
const { loginValidation,signupValidation, forgotPasswordValidation } = require("../utils/validations/userValidation")

const loginHandler = async (req,res) => {
    try {
        const { email, password } = req?.body || {};
        
        const validationErrors = loginValidation(req?.body);
        
        if (!validationErrors.isValid) {
            return res.status(400).json({ message: "Validation errors", errors: validationErrors.errors });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found,please sign up!" });
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Logged in Successfully!", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error?.message });
    }    
}

const signupHandler = async (req, res) => { 
    const { firstName, lastName, email, password } = req?.body || {};
    try {
        const validationErrors = signupValidation(req?.body);
        if (!validationErrors.isValid) {
            return res.status(400).json({ message: "Validation errors", errors: validationErrors.errors });
        }
        
        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.status(409).json({ message: "User already exists, please login!" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
 
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error?.message });
    }
}

const forgotPasswordHandler = async (req, res) => { 

  try {
    const { email, newPassword } = req?.body || {};

    const validationErrors = forgotPasswordValidation(req?.body);
    if (!validationErrors.isValid) {
        return res.status(400).json({ message: "Validation errors", errors: validationErrors.errors });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(404).json({ message: "User not found, please sign up!" });
    }
      
    const isSamePassword = await bcrypt.compare(newPassword, existingUser.password);
    if (isSamePassword) {
        return res.status(400).json({ message: "New password must be different from the old password" });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
      
    const updatedUser = await User.findOneAndUpdate({email}, { password: hashedPassword }, { new: true });
    if (updatedUser === null) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error?.message });
  }

}

module.exports = {
    loginHandler,
    signupHandler,
    forgotPasswordHandler   
}