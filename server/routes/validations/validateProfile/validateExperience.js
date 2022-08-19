
const Validator = require("validator");

const helperValidate = require("../../../helpers/helperValidate");

exports.validateInput = (data) => {


    let fieldsToBeValidated = [
        {
            key: "title",
            emptyCheck: true,
            min: 2,
            max: 40
        },
        {
            key: "company",
            emptyCheck: true,
            min: 2,
            max: 60
        },
        {
            key: "from",
            emptyCheck: true,
            min: 2,
            max: 20
        }

    ];


    let errors = helperValidate.validateFields(data,fieldsToBeValidated);


    return {
        errors,
        isValid: helperValidate.isEmpty(errors)
    };
};
