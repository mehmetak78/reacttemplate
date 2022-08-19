
const Validator = require("validator");

const helperValidate = require("../../../helpers/helperValidate");

exports.validateInput = (data) => {


    let fieldsToBeValidated = [
        {
            key: "handle",
            emptyCheck: true,
            min: 2,
            max: 40
        },
        {
            key: "status",
            emptyCheck: true
        },
        {
            key: "skills",
            emptyCheck: true,
            min: 6,
            max: 30
        },
        {
            key: "website",
            urlCheck: true
        },
        {
            key: "youtube",
            urlCheck: true
        },
        {
            key: "twitter",
            urlCheck: true
        },
        {
            key: "facebook",
            urlCheck: true
        },
        {
            key: "linkedin",
            urlCheck: true
        },
        {
            key: "instagram",
            urlCheck: true
        }
    ];


    let errors = helperValidate.validateFields(data,fieldsToBeValidated);


    return {
        errors,
        isValid: helperValidate.isEmpty(errors)
    };
};
