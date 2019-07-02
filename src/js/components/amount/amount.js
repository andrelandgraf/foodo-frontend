import React from 'react';
import PropTypes from 'prop-types';

const Amount = ( {
    value, unit, onChange, classes,
} ) => (
    <div className={classes}>
        <input
            value={value}
            onChange={onChange}
            placeholder="5"
            required
        />
        <span>{unit}</span>
    </div>
);

Amount.propTypes = {
    value: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.string.isRequired,
};

export default Amount;
