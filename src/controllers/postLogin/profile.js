const jwt = require("jsonwebtoken");
const User = require("../../model/user");

const profileHandler = async (req, res) => {
    try {
        const { token } = req.cookies;
        const tokenValue = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        const user = await User.findById(tokenValue._id);
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