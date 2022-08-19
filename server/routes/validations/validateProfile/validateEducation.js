
const Validator = require("validator");

const helperValidate = require("../../../helpers/helperValidate");

exports.validateInput = (data) => {


    let fieldsToBeValidated = [
        {
            key: "school",
            emptyCheck: true,
            min: 2,
            max: 60
        },
        {
            key: "degree",
            emptyCheck: true,
            min: 1,
            max: 10
        },
        {
            key: "fieldofstudy",
            emptyCheck: true,
            min: 2,
            max: 100
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
