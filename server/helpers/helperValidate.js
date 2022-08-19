
const Validator = require("validator");

exports.isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

exports.validateFields = (data,fieldsToBeValidated)  => {
    let errors = {};
    fieldsToBeValidated.forEach(field => {
        data[field.key] = !this.isEmpty(data[field.key]) ? data[field.key] : "";
        console.log("Field:",field);
        console.log("data[field.key]:",data[field.key]);

        if (!Validator.isLength(data[field.key], { min: field.min, max: field.max })) {
            //errors["field_"+field.key] = `${field.key} length must be between ${field.min} and ${field.max} characters`;
            errors[""+field.key] = `${field.key} length must be between ${field.min} and ${field.max} characters`;
        }

        if (field.emailCheck && !Validator.isEmail(data[field.key])) {
            errors[""+field.key] = `${data[field.key]} is not a valid email`;
        }

        if (field.urlCheck && data[field.key]!== "" && !Validator.isURL(data[field.key])) {
            errors[""+field.key] = `${data[field.key]} is not a valid url`;
        }

        if (field.emptyCheck && Validator.isEmpty(data[field.key])) {
            errors[""+field.key] = `${field.key} is required`;
        }
    });
    return errors;
};

