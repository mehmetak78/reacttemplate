import React from 'react';
import PropTypes from "prop-types";

const InputGroup = (
    {
        name,
        placeholder,
        value,
        error,
        icon,
        type,
        onChange
    }) => {
    const v_className = error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg";
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <div className="span input-group-text">
                    <i className={icon} />
                </div>
            </div>
            <input
                name={name}
                placeholder={placeholder}
                value={value}
                type={type}
                className={v_className}
                onChange={onChange}
            />
            {error && (<div className="invalid-feedback"> {error} </div>)}
        </div>
    );
};
InputGroup.propTypes = {
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    icon:PropTypes.string,
    type:PropTypes.string.isRequired,
    error:PropTypes.string,
    onChange:PropTypes.func.isRequired
};

InputGroup.defaultProps = {
    type: "text"
};

export default InputGroup;
