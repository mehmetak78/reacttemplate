
const Validator = require("validator");

const helperValidate = require("../../../helpers/helperValidate");

exports.validateInput = (data) => {

    let fieldsToBeValidated = [
        {
            key: "text",
            emptyCheck: true,
            min: 10,
            max: 300
        }
    ];

    let errors = helperValidate.validateFields(data,fieldsToBeValidated);

    return {
        errors,
        isValid: helperValidate.isEmpty(errors)
    };
};
