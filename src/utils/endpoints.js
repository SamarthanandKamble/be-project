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
        /*
        getStats
        getNotifications
        markNotificationRead
        */
    },
}

module.exports = endpoints;