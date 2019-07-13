import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import arrowDown from '../../img/arrow-down.svg';
import userLogo from '../../img/user-logo.svg';
import forkKnife from '../../img/fork-knife.svg';
import foodJPG from '../../img/food.jpg';

import Button from '../components/button/button';
import { isLoggedIn } from '../services/foodo-api/user/userService';
import { RecipesProvider, RecipesContext } from '../provider/RecipesProvider';
import { AUTH_ROUTES } from '../container/App/App';
import { setRedirectUrl } from '../utilities/redirect';

const AboutView = ( { onClickGetStarted } ) => {
    const label = isLoggedIn() ? i18n.t( KEYS.HEADERS.GOTO_FOODO )
        : i18n.t( KEYS.HEADERS.GET_STARTED );

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
                <Button label={label} onClick={onClickGetStarted} primary />
            </div>
            <ArrowDown href="#about-page-2" />
        </section>
    );

    const PageTwo = () => {
        const [ index, setIndex ] = useState( 0 );
        const labels = [
            i18n.t( KEYS.HEADERS.PAGE2_LABEL1 ),
            i18n.t( KEYS.HEADERS.PAGE2_LABEL2 ),
            i18n.t( KEYS.HEADERS.PAGE2_LABEL3 ),
        ];
        const info = i18n.t( KEYS.HEADERS.PAGE2_INFO );
        const teaser = i18n.t( KEYS.HEADERS.PAGE2_TEASER );
        useEffect( () => {
            const timeout = setTimeout( () => setIndex( ( index + 1 ) % labels.length ), 2000 );
            return () => clearTimeout( timeout );
        }, [ index ] );

        return (
            <section id="about-page-2" className="about-page-2">
                <div className="about-page-2-title-box">
                    <h1 className="about-page-2-title-box-title">
                        <span>
                            {i18n.t( KEYS.LABELS.APP_NAME )}
                        </span>
                        {` ${ i18n.t( KEYS.HEADERS.PAGE2_TITLE ) }`}
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

    const PageThree = () => {
        const style = {
            backgroundImage: `url( ${ foodJPG } )`,
        };
        return (
            <section id="about-page-3" className="about-page-3" style={style}>
                <div className="about-page-3-profile-box">
                    <img src={userLogo} alt="user icon" />
                    <ul>
                        <li>{i18n.t( KEYS.LABELS.GOAL_PITCH )}</li>
                        <li>{i18n.t( KEYS.LABELS.LIFESTYLE_PITCH )}</li>
                        <li>{i18n.t( KEYS.LABELS.ALLERGIES_PITCH )}</li>
                    </ul>
                </div>
                <div className="about-page-3-cooking-box">
                    <img src={forkKnife} alt="fork and knife icon" />
                    <ul>
                        <li>{i18n.t( KEYS.LABELS.MANUAL_PITCH_START )}</li>
                        <li>{i18n.t( KEYS.LABELS.MANUAL_PITCH_ALTER )}</li>
                        <li>{i18n.t( KEYS.LABELS.MANUAL_PITCH_SUBSTITUTE )}</li>
                    </ul>
                </div>
                <ArrowDown href="#about-page-4" />
            </section>
        );
    };

    const PageFour = () => {
        const [ recipe, setRecipe ] = useState();
        const { recipes } = useContext( RecipesContext );

        const onSelect = r => setRecipe( r );

        if ( recipe ) {
            setRedirectUrl( `${ AUTH_ROUTES.COOKING }${ recipe._id }` );
            return <Redirect push to={`${ AUTH_ROUTES.COOKING }${ recipe._id }`} />;
        }
        return (
            <div id="about-page-4" className="about-page-4">
                <h3>{i18n.t( KEYS.HEADERS.START_NOW )}</h3>
                <div className="about-page-4-recipes-container">
                    <h2>{i18n.t( KEYS.HEADERS.SELECT_RECIPE )}</h2>
                    <div className="about-page-4-recipes-container-input">
                        <DataListInput
                            items={recipes.map( r => ( {
                                ...r,
                                key: r._id,
                                label: r.name,
                            } ) )}
                            placeholder={i18n.t( KEYS.LABELS.SELECT_RECIPE_PLACEHOLDER )}
                            onSelect={onSelect}
                            inputClassName="datalist-input-input"
                            dropdownClassName="datalist-input-dropdown"
                            itemClassName="datalist-input-item"
                            activeItemClassName="datalist-input-activeItem"
                            suppressReselect={false}
                            clearInputOnSelect
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="about">
            <PageOne />
            <PageTwo />
            <PageThree />
            <RecipesProvider>
                <PageFour />
            </RecipesProvider>
        </div>
    );
};

AboutView.propTypes = {
    onClickGetStarted: PropTypes.func.isRequired,
};

export default AboutView;
