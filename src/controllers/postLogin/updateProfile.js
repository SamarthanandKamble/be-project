const { updateProfileValidation } = require("../../utils/validations/profile");

const updateUserDetails = async (req, res) => {
    try {
        const existingUser = req?.user;
        const allowedToUpdateKeys = new Set(["dob", "imageUrl", "city"]);

        const isOnlyAllowedKeysPresent = Object.keys(req?.body).every((key) =>
            allowedToUpdateKeys.has(key)
        );

        if (!isOnlyAllowedKeysPresent) {
            return res.status(400).json({ message: "Invalid req body" });
        }

        const validationErrors = updateProfileValidation(req?.body);
        if (!validationErrors.isValid) {
            return res.status(400).json({ message: "Validation errors", error: validationErrors.errors });
        }

        Object.entries(req?.body).forEach(
            ([key, value]) => (existingUser[key] = value)
        );

        await existingUser.save();
        res.status(200).json({ message: "User profile updated successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error", error: error?.message });
    }
};

module.exports = { updateUserDetails, };