const validate = require('validator');

const updateProfileValidation = (data) => {
    let errors = {};

    Object.entries(data).forEach(([key, value]) => {
        if (typeof value !== 'string' || validate.isEmpty(value.trim())) {
            errors[key] = `${key} cannot be empty`;
        }

        if (key === "imageUrl" && !validate.isURL(value)) {
            errors.imageUrl = "Invalid image URL";
        }

        if (key === 'dob' && !validate.isDate(value, { format: 'YYYY-MM-DD', strictMode: true })) {
            errors.dob = "Invalid date of birth format. Use YYYY-MM-DD";
        }

        if (key === 'city' && value.length > 15) {
            errors.city = "City length cannot exceeed 15 characters";
        }
    })

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }


}
module.exports = { updateProfileValidation };