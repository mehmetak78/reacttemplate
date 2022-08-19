import React from 'react';
import PropTypes from "prop-types";

const TextFieldGroup = (
    {
        name,
        placeholder,
        value,
        type,
        error,
        label,
        info,
        disabled,
        onChange
    }) => {
    const v_className = error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg";
    return (
        <div className="form-group">
            {label && (<label htmlFor={name}>{label}</label>)}
            <input
                name={name}
                placeholder={placeholder}
                value={value}
                type={type}
                className={v_className}
                disabled={disabled}
                onChange={onChange}
            />
            {info && (<small className="form-text text-muted"> {info} </small>)}
            {error && (<div className="invalid-feedback"> {error} </div>)}
        </div>
    );
};
TextFieldGroup.propTypes = {
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    type:PropTypes.string.isRequired,
    label:PropTypes.string,
    disabled:PropTypes.string,
    onChange:PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
    type: "text"
};

export default TextFieldGroup;
