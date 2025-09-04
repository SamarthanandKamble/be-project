//signup validation
//login validation
//update validation
//get user validation
const validator = require('validator');
const { strongPasswordOptions, PASSWORD_VALIDATION_ERROR } = require('../constants');

const loginValidation = (data) => {
    let errors = {};
    if (!data.email || !validator.isEmail(data.email)) {
        errors.email = "Invalid email format";
    }
    if (!data.password || !validator.isStrongPassword(data.password, strongPasswordOptions)) {
        errors.password = PASSWORD_VALIDATION_ERROR;
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}


const signupValidation = (data) => {
    let errors = {};
    if (!data.firstName || !validator.isAlpha(data.firstName)) {
        errors.firstName = "First name must contain only alphabetic characters";
    }

    if (!data.lastName || !validator.isAlpha(data.lastName)) {
        errors.lastName = "Last name must contain only alphabetic characters";
    }

    if (!data.email || !validator.isEmail(data.email)) {
        errors.email = "Invalid email format";
    }

    if (!data.password || !validator.isStrongPassword(data.password, strongPasswordOptions)) {
        errors.password = PASSWORD_VALIDATION_ERROR
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }

}

const forgotPasswordValidation = (data) => {
    let errors = {};
    if (!data.email || !validator.isEmail(data.email)) {
        errors.email = "Invalid email format";
    }
    if (!data.newPassword || !validator.isStrongPassword(data.newPassword, strongPasswordOptions)) {
        errors.newPassword = PASSWORD_VALIDATION_ERROR;
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}

module.exports = {
    loginValidation,
    signupValidation,
    forgotPasswordValidation,
}