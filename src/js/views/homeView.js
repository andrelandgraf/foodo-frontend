import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import RecipesContainer from '../container/Recipes/RecipesContainer';
import RecipesGridsContainer from '../container/Recipes/RecipesGridsContainer';

function dancingText() {
    const h1 = document.querySelector( '.header' );
    const text = h1.textContent;
    const array = text.split( '' );
    let innerHTML = '';
    array.forEach( ( value ) => {
        innerHTML += `<span class='dancing-text'>${ value }</span>`;
    } );
    h1.innerHTML = innerHTML;

    function dance( i ) {
        const textBoxes = document.querySelectorAll( '.dancing-text' );
        const { length } = textBoxes;
        if ( i >= length ) {
            textBoxes[ i - 1 ].classList.toggle( 'funky' );
            h1.classList.toggle( 'bright-shadow' );
            return;
        }
        textBoxes[ i ].classList.toggle( 'funky' );
        if ( i > 0 ) {
            textBoxes[ i - 1 ].classList.toggle( 'funky' );
        } else {
            h1.classList.toggle( 'bright-shadow' );
        }
        setTimeout( () => {
            dance( i + 1 );
        }, 250 );
    }

    setInterval( () => {
        dance( 0 );
    }, 5000 );
}

const HomeView = ( { user } ) => {
    useEffect( () => { dancingText(); }, [] );

    return (
        <div className="container home-container">
            <h1 className="header">{i18n.t( KEYS.HEADERS.HOME_WELCOME, { name: user.username } )}</h1>
            <RecipesContainer />
            <RecipesGridsContainer />
        </div>

    );
};

HomeView.propTypes = {
    user: PropTypes.shape( {
        username: PropTypes.string.isRequired,
    } ).isRequired,
};

export default HomeView;
