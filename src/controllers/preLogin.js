const User = require("../model/user");
const bcrypt = require("bcrypt");
const {
    loginValidation,
    signupValidation,
    forgotPasswordValidation,
} = require("../utils/validations/userValidation");
const { MAXIMUM_LOGIN_ATTEMPTS } = require("../utils/constants");

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req?.body || {};
        const validationErrors = loginValidation(req?.body);
        const user = await User.findOne({ email });

        if (user?.isLocked) {
            return res
                .status(403)
                .json({
                    message:
                        "Account is locked due to multiple failed login attempts. Please unlock your account.",
                });

        }

        if (!validationErrors.isValid) {
            return res.status(400).json({
                message: "Validation errors",
                errors: validationErrors.errors,
            });
        }
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found,please sign up!" });
        }

        if (user?.loginAttempts >= MAXIMUM_LOGIN_ATTEMPTS ) {
            await User.findOneAndUpdate(
                { email },
                { isLocked: true, loginAttempts: MAXIMUM_LOGIN_ATTEMPTS },
                { new: true }
            );
            return res
            .status(403)
            .json({
                message:
                "Account locked due to multiple failed login attempts. Please unlock your account.",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {

            const remainigAttemptsToLogin = MAXIMUM_LOGIN_ATTEMPTS - (user?.loginAttempts + 1);
            
            await User.findOneAndUpdate(
                { email },
                { $inc: { loginAttempts: 1 } },
                { new: true }
            );
            return res.status(401).json({ message: `Invalid credentials, remaining attempts for login ${remainigAttemptsToLogin}`  });
        }
        res.status(200).json({ message: "Logged in Successfully!", user });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error", error: error?.message });
    }
};

const signupHandler = async (req, res) => {
    const { firstName, lastName, email, password } = req?.body || {};
    try {
        const validationErrors = signupValidation(req?.body);
        if (!validationErrors.isValid) {
            return res.status(400).json({
                message: "Validation errors",
                errors: validationErrors.errors,
            });
        }

        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res
                .status(409)
                .json({ message: "User already exists, please login!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res
            .status(201)
            .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error", error: error?.message });
    }
};

const forgotPasswordHandler = async (req, res) => {
    try {
        const { email, newPassword } = req?.body || {};

        const validationErrors = forgotPasswordValidation(req?.body);
        if (!validationErrors.isValid) {
            return res.status(400).json({
                message: "Validation errors",
                errors: validationErrors.errors,
            });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res
                .status(404)
                .json({ message: "User not found, please sign up!" });
        }

        const isSamePassword = await bcrypt.compare(
            newPassword,
            existingUser.password
        );
        if (isSamePassword) {
            return res.status(400).json({
                message: "New password must be different from the old password",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );
        if (updatedUser === null) {
            return res.status(404).json({ message: "User not found" });
        }
        res
            .status(200)
            .json({ message: "Password updated successfully", user: updatedUser });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error", error: error?.message });
    }
};

const unlockAccountHandler = async (req, res) => {
    try {
        const { email ,password} = req?.body;
        // const isValidationErrors = unlockAccountValidation(req?.body);
        // if (!isValidationErrors.isValid) {
        //     return res.status(400).json({
        //         message: "Validation errors",
        //         errors: isValidationErrors.errors,
        //     });
        // }
        const isExisitingUser = await User.findOne({ email });
        if (!isExisitingUser) {
            return res
                .status(404)
                .json({ message: "User not found,please sign up!" });
        }
        
        const comparePassword = await bcrypt.compare(password, isExisitingUser.password);
        if(!comparePassword){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (isExisitingUser.isLocked) {
            await User.findOneAndUpdate(
                { email },
                { isLocked: false, loginAttempts: 0 },
                { new: true }
            );
            res.status(200).json({ message: "Account unlocked successfully!" });
        } else {
            res.status(200).json({ message: "Account is not locked!" });
        }
    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error", error: error?.message });
    }
};

module.exports = {
    loginHandler,
    signupHandler,
    forgotPasswordHandler,
    unlockAccountHandler,
};
