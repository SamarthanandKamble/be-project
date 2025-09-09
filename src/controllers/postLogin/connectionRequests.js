const ConnectionRequestsModel = require("../../model/connectionRequests");
const User = require("../../model/user");

const connectionRequests = async (req, res) => {
    try {

        const { status, toUserId } = req.params;
        const exisitingUser = req.user;
        const toUser = await User.findById(toUserId);
        const collections = await ConnectionRequestsModel.find({ fromUserId: exisitingUser._id, toUserId: toUserId });

        if (!exisitingUser || !toUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (exisitingUser._id?.toString() === toUserId) {
            return res.status(400).json({ message: exisitingUser.firstName + ", you cannot send a request to yourself!" });
        }

        if (collections.length > 0) {
            return res.status(400).json({ message: "Connection request has been already sent to " + toUser.firstName });
        }

        const connection = await ConnectionRequestsModel.create({
            fromUserId: exisitingUser._id,
            toUserId: toUserId,
            status: status,
        });

        if (!connection) {
            return res.status(400).json({ message: "Failed to send connection request" });
        }

        await connection.save();
        res.status(200).json({ message: "Connection request sent successfully to " + toUser.firstName });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};

module.exports = { connectionRequests };