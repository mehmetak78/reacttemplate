
const helperValidate = require("../../../helpers/helperValidate");

exports.validateInput = (data) => {

    let fieldsToBeValidated = [
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
        }
    ];

    let errors = helperValidate.validateFields(data,fieldsToBeValidated);

    return {
        errors,
        isValid: helperValidate.isEmpty(errors)
    };
};
