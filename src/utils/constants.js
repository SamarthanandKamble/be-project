exports.SALT_ROUNDS = 10;

exports.strongPasswordOptions = {
    minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
};

exports.MAXIMUM_LOGIN_ATTEMPTS = 3;

exports.PASSWORD_VALIDATION_ERROR = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"