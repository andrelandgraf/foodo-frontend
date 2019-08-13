import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../loading/loader';

/**
 * Form Button
 * @param label button label
 * @param isLoading if the button should display a loading icon
 * @param disabled if the button should be displayed as disabled
 */
const SubmitButton = ( {
    label, isLoading, disabled, classes,
} ) => (
    <>
        <button
            type="submit"
            className={`btn btn-primary ${ classes }`}
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
    classes: PropTypes.string,
};

SubmitButton.defaultProps = {
    disabled: false,
    isLoading: false,
    classes: '',
};

export default SubmitButton;
