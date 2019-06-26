/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import arrowDown from '../../img/arrow-down.svg';
import Button from '../components/button/button';
import { isAuthenticated } from '../services/foodo-api/user/userService';

const AboutView = ( { onClickGetStarted } ) => {
    const label = isAuthenticated() ? 'Go to Foodo' : 'Get Started';

    const ArrowDown = ( { href } ) => (
        <div className="about-arrow-down">
            <a href={href}>
                <img src={arrowDown} alt="scroll down" />
            </a>
        </div>
    );

    ArrowDown.propTypes = { href: PropTypes.string.isRequired };

    const PageOne = () => (
        <section id="about-page-1" className="about-page-1">
            <div className="about-page-1-title-box">
                <h1 className="about-page-1-title-box-title">Foodo</h1>
            </div>
            <div className="about-page-1-get-started-button">
                <Button text={label} onClick={onClickGetStarted} primary />
            </div>
            <ArrowDown href="#about-page-2" />
        </section>
    );

    const PageTwo = () => {
        const [ index, setIndex ] = useState( 0 );
        const labels = [
            'Companion',
            'Nutrition Expert',
            'Sam to your Frodo',
        ];
        const info = 'We will compute the best fitting substiutes for your daily home cooked meals.';
        const teaser = 'Find out how!';
        useEffect( () => {
            const timeout = setTimeout( () => setIndex( ( index + 1 ) % labels.length ), 2000 );
            return () => clearTimeout( timeout );
        }, [ index ] );

        return (
            <section id="about-page-2" className="about-page-2">
                <div className="about-page-2-title-box">
                    <h1 className="about-page-2-title-box-title">
                        Foodo is your
                    </h1>
                </div>
                <div className="about-page-2-description-box">
                    <h2 className="about-page-2-description-box-description">{labels[ index ]}</h2>
                </div>
                <div className="about-page-2-info-box">
                    <span>{info}</span>
                    <a href="#about-page-3"><span>{teaser}</span></a>
                </div>
                <ArrowDown href="#about-page-3" />
            </section>
        );
    };

    return (
        <div className="about">
            <PageOne />
            <PageTwo />
        </div>
    );
};

AboutView.propTypes = {
    onClickGetStarted: PropTypes.func.isRequired,
};

export default AboutView;
