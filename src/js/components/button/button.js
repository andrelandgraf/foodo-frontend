import React from 'react';
import PropTypes from 'prop-types';

export const BUTTON_STYLES = 'clickable button-center';

const Button = ( {
    classes, label, onClick, primary, disabled,
} ) => (
    <button
        className={`${ BUTTON_STYLES } btn ${ primary ? 'btn-primary' : '' } ${ classes }`}
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
