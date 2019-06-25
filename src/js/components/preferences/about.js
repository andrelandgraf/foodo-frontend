import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import book from '../../../img/book.svg';

import CustomButton from '../button/customButton';


const About = ( { onClickAbout } ) => (
    <CustomButton
        id="about-page"
        role="button"
        onClick={onClickAbout}
    >
        {i18n.t( KEYS.LABELS.ABOUT )}
        <img
            src={book}
            alt="Goto About Page"
        />
    </CustomButton>
);

About.propTypes = {
    onClickAbout: PropTypes.func.isRequired,
};

export default About;
