import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input field for inserting amounts of an ingredient
 * @param value the current input value
 * @param unit the corresponding unit (e.g. gram)
 * @param onChange function
 * @param classes futher css classes
 */
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
