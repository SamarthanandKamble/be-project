const endpoints = {
    AUTH: {
        LOGIN: "/login",
        SIGNUP: "/signup",
        FORGOT_PASSWORD: "/forgotPassword",
        UNLOCK_ACCOUNT: "/unlockAccount",
        LOGOUT: "/logout",
    },
    PROFILE: {
        PROFILE: "/getUserDetails",
        UPDATE: "/update"
    },
    DASHBOARD: {
        SEND_CONNECTION_REQUESTS: "/connectionRequests/send/:status/:toUserId",
        RESPOND_CONNECTION_REQUESTS: "/connectionRequests/respond/:status/:toUserId",
        RECIEVED_REQUESTS: "/connectionRequests/recieved",
    },
}

module.exports = endpoints;