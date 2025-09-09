const mongoose = require("mongoose");

const ConnectionRequestsSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        status: {
            type: String, enum: {
                values: ["pending", "interested", "rejected"],
                message: "Invalid Status",
            }, default: "pending", required: true
        },
    },
    {
        timestamps: true,
    }
);


const checkIfConnectionRequestToSelf = async function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        return next(new Error(connectionRequest.fromUserId + " You cannot send a connection request to yourself"));
    }
    next();
}

ConnectionRequestsSchema.pre('save', checkIfConnectionRequestToSelf)

const ConnectionRequestsModel = mongoose.model(
    "ConnectionRequests",
    ConnectionRequestsSchema
);

module.exports = ConnectionRequestsModel;
