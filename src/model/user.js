const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: [true, "Email already exists!"],
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true },
        dob: { type: String, trim: true, format: 'YYYY-MM-DD' },
        gender: {
            type: String,
            enum: {
                values: ["male", "female"],
                message: "{VALUE} is not supported",
            }
        },
        city: { type: String },
        isLocked: { type: Boolean, default: false },
        loginAttempts: { type: Number, default: 0 },
        imageUrl: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
