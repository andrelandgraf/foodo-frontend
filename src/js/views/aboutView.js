/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import arrowDown from '../../img/arrow-down.svg';
import ImageButton from '../components/button/imageButton';
import Button from '../components/button/button';
import { isAuthenticated } from '../services/foodo-api/user/userService';

const AboutView = ( { onClickGetStarted } ) => {
    const label = isAuthenticated() ? 'Go to Foodo' : 'Get Started';

    return (
        <div className="about">
            <div className="about-page-1">
                <div className="about-page-1-title-box">
                    <h1 className="about-page-1-title-box-title">Foodo</h1>
                </div>
                <div className="about-page-1-get-started-button">
                    <Button text={label} onClick={onClickGetStarted} primary />
                </div>
            </div>
            <div>
                <ImageButton src={arrowDown} alt="scroll down" onClick={onClickGetStarted} />
            </div>
        </div>
    );
};

AboutView.propTypes = {
    onClickGetStarted: PropTypes.func.isRequired,
};

export default AboutView;
