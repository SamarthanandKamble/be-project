const jwt = require("jsonwebtoken");
const User = require("../../model/user");

const profileHandler = async (req, res) => {
    try {
        const user = req?.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User profile fetched successfully", user });

    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error", error: error?.message });
    }
}

module.exports = { profileHandler };