import React from 'react';
import PropTypes from 'prop-types';

export const BUTTON_STYLES = 'clickable button-center';

const Button = ( {
    classes, text, onClick, primary,
} ) => (
    <button
        className={`${ BUTTON_STYLES } btn ${ primary ? 'btn-primary' : undefined } ${ classes || undefined }`}
        type="button"
        onClick={onClick}
    >
        {text}
    </button>
);

Button.propTypes = {
    classes: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
};

Button.defaultProps = {
    classes: '',
    text: 'click',
    onClick: undefined,
    primary: false,
};

export default Button;
