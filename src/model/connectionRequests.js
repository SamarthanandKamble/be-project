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

const ConnectionRequestsModel = mongoose.model(
    "ConnectionRequests",
    ConnectionRequestsSchema
);

module.exports = ConnectionRequestsModel;
