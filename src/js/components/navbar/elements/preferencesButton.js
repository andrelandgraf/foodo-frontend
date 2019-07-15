import React from 'react';
import PropTypes from 'prop-types';

import ImageButton from '../../button/imageButton';

const PreferencesButton = ( {
    label, float, onClick, prefIcon,
} ) => (
    <li className={float === 'right' ? 'item-right' : undefined}>
        <ImageButton
            classes="icon-item"
            id="preferences-navbar-button"
            onClick={onClick}
            src={prefIcon}
            alt={label}
        />
    </li>
);

PreferencesButton.propTypes = {
    label: PropTypes.string.isRequired,
    float: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    prefIcon: PropTypes.string.isRequired,
};

export default PreferencesButton;
