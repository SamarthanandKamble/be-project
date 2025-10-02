const { mongoose } = require("mongoose");
const ConnectionRequestsModel = require("../../model/connectionRequests");
const User = require("../../model/user");

const sendConnectionRequest = async (req, res) => {
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

const recievedConnectionRequests = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const recivedRequests = await ConnectionRequestsModel.find({ toUserId: user._id, status: "interested" }).populate("fromUserId", "firstName lastName email");
        res.status(200).json({ count: recivedRequests?.length, recivedRequests });
    } catch (error) {
        res.send(500).json({ message: "Internal Server error", error: error.message });
    }
}

const respondConnectionRequest = async (req, res) => {

    try {
        const { status, toUserId } = req.params || {};
        const user = req.user;
        const validStatuses = ["accepted", "rejected"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status!" });
        }
        const updatedResult = await ConnectionRequestsModel.findOneAndUpdate({
            _id: toUserId,
            toUserId: user._id,
            status: "interested"
        }, { status: status }, { new: true });


        if (!updatedResult) {
            return res.status(400).json({ message: "No pending request found from this user" });
        }

        res.status(200).json({ message: `Connection request ${status} successfully` });

    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
}

module.exports = { sendConnectionRequest, recievedConnectionRequests, respondConnectionRequest };