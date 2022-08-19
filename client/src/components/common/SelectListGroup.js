import React from 'react';
import PropTypes from "prop-types";

const SelectListGroup = (
    {
        name,
        value,
        error,
        info,
        options,
        onChange
    }) => {
    const selectOptions = options.map(option => (
            <option key={option.label} value={option.value}>
                {option.label}
            </option>
        )
    );
    const v_className = error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg";
    return (
        <div className="form-group">
            <select
                name={name}
                value={value}
                className={v_className}
                onChange={onChange}>
                {selectOptions}
            </select>
            {info && (<small className="form-text text-muted"> {info} </small>)}
            {error && (<div className="invalid-feedback"> {error} </div>)}
        </div>
    );
};

SelectListGroup.propTypes = {
    name:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    options:PropTypes.array.isRequired,
    onChange:PropTypes.func.isRequired
};

SelectListGroup.defaultProps = {

};

export default SelectListGroup;
