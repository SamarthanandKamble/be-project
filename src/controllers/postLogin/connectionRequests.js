const { mongoose } = require("mongoose");
const ConnectionRequestsModel = require("../../model/connectionRequests");
const User = require("../../model/user");

const connectionRequests = async (req, res) => {
    try {

        const { status, toUserId } = req.params;
        const exisitingUser = req.user;

        if (!mongoose.Types.ObjectId.isValid(toUserId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const toUser = await User.findById(toUserId);

        const isConnectionRequestAlreadySent = await ConnectionRequestsModel.findOne({ $or: [{ fromUserId: exisitingUser._id, toUserId: toUserId }, { fromUserId: toUserId, toUserId: exisitingUser._id }] });

        if (!exisitingUser || !toUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (exisitingUser._id?.toString() === toUserId) {
            return res.status(400).json({ message: exisitingUser.firstName + ", you cannot send a request to yourself!" });
        }

        if (isConnectionRequestAlreadySent) {
            return res.status(400).json({ message: "Connection request has already been sent to " + toUser.firstName });
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