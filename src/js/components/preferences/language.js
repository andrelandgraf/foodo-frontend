import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import GlobeIcon from '../../../img/globe.svg';

import CustomButton from '../button/customButton';

const Language = ( { onClick } ) => (
    <CustomButton
        id="select-language-button"
        role="button"
        onClick={onClick}
    >
        {i18n.t( KEYS.LABELS.LANGUAGE )}
        <img
            src={GlobeIcon}
            alt="Language Icon"
        />
    </CustomButton>
);

Language.propTypes = {
    onClick: PropTypes.func,
};

Language.defaultProps = {
    onClick: undefined,
};

export default Language;
