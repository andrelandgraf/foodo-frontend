import React from 'react';
import PropTypes from 'prop-types';

import { BUTTON_STYLES } from './button';

const SubmitButton = ( { label, isLoading, disabled } ) => (
    <>
        <button
            type="submit"
            className={`${ BUTTON_STYLES } btn btn-primary`}
            disabled={disabled || isLoading}
        >
            { label }
        </button>
    </>
);

SubmitButton.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
};

SubmitButton.defaultProps = {
    disabled: false,
    isLoading: false,
};

export default SubmitButton;
