import React from 'react';
import PropTypes from 'prop-types';

/**
 * Standard button component
 * @param classes further css classes
 * @param label a label for the button
 * @param onClick function
 * @param primary if its a primary button (styling)
 * @param disabled if the button should be disabled (styling)
 */
const Button = ( {
    classes, label, onClick, primary, disabled,
} ) => (
    <button
        className={`btn ${ primary ? 'btn-primary' : '' } ${ classes }`}
        type="button"
        onClick={onClick}
        disabled={disabled}
    >
        {label}
    </button>
);

Button.propTypes = {
    classes: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    classes: '',
    label: 'click',
    onClick: undefined,
    primary: false,
    disabled: false,
};

export default Button;
