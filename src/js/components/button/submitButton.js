import React from 'react';
import PropTypes from 'prop-types';

import { BUTTON_STYLES } from './button';
import Loader from '../loading/loader';

const SubmitButton = ( { label, isLoading, disabled } ) => (
    <>
        <button
            type="submit"
            className={`${ BUTTON_STYLES } btn btn-primary`}
            disabled={disabled || isLoading}
        >
            {
                isLoading
                    ? <Loader message={label} tiny />
                    : label
            }
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
