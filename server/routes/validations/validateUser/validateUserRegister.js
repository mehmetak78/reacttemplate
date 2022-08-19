
const Validator = require("validator");

const helperValidate = require("../../../helpers/helperValidate");

exports.validateInput = (data) => {


    let fieldsToBeValidated = [
        {
            key: "name",
            emptyCheck: true,
            min: 2,
            max: 30
        },
        {
            key: "email",
            emptyCheck: true,
            emailCheck: true
        },
        {
            key: "password",
            emptyCheck: true,
            min: 5,
            max: 30
        },
        {
            key: "password2",
            emptyCheck: true,
            min: 5,
            max: 30
        }
    ];


    let errors = helperValidate.validateFields(data,fieldsToBeValidated);


    if (!Validator.equals(data.password, data.password2)) {
        errors.field_password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: helperValidate.isEmpty(errors)
    };
};
