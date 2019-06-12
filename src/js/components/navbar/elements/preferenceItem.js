import React from 'react';
import PropTypes from 'prop-types';

import UserLogo from '../../../../img/user-logo.svg';
import ImageButton from '../../button/imageButton';

const PreferenceItem = ( { label, float, onClick } ) => (
    <li className={float === 'right' ? 'item-right' : undefined}>
        <ImageButton
            classes="icon-item"
            id="preferences-navbar-button"
            onClick={onClick}
            src={UserLogo}
            alt={label}
        />
    </li>
);

PreferenceItem.propTypes = {
    label: PropTypes.string.isRequired,
    float: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PreferenceItem;
