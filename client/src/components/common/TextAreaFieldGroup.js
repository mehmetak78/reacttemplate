import React from 'react';
import PropTypes from "prop-types";

const TextAreaFieldGroup = (
    {
        name,
        placeholder,
        value,
        rows,
        error,
        info,
        onChange
    }) => {
    const v_className = error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg";
    return (
        <div className="form-group">
            <textarea
                rows = {rows}
                name={name}
                placeholder={placeholder}
                value={value}
                className={v_className}
                onChange={onChange}
            />
            {info && (<small className="form-text text-muted"> {info} </small>)}
            {error && (<div className="invalid-feedback"> {error} </div>)}
        </div>
    );
};
TextAreaFieldGroup.propTypes = {
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    rows:PropTypes.number.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    onChange:PropTypes.func.isRequired
};

TextAreaFieldGroup.defaultProps = {
    rows: 2
};

export default TextAreaFieldGroup;
