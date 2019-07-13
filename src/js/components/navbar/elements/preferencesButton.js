import React from 'react';
import PropTypes from 'prop-types';

import userLogo from '../../../../img/user-logo.svg';
import ImageButton from '../../button/imageButton';

const PreferencesButton = ( { label, float, onClick } ) => (
    <li className={float === 'right' ? 'item-right' : undefined}>
        <ImageButton
            classes="icon-item"
            id="preferences-navbar-button"
            onClick={onClick}
            src={userLogo}
            alt={label}
        />
    </li>
);

PreferencesButton.propTypes = {
    label: PropTypes.string.isRequired,
    float: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PreferencesButton;
