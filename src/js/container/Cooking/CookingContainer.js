import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import i18n from 'i18next';

import { getLocale, KEYS } from '../../utilities/internationalization/internationalization';

import {
    getUserRecipe, getRecipe, postUserRecipe, getRecipeSubstitutes, updateUserRecipe,
} from '../../services/foodo-api/recipe/recipesService';

import { UserStateContext } from '../../provider/UserStateProvider';

import Recipe from '../../components/recipe/recipe';
import Loader from '../../components/loading/loader';
import Ingredient from '../../components/ingredient/ingredient';
import Modal from '../../components/modal/modal';
import Message, { MESSAGE_TYPES } from '../../components/message/message';

function CookingContainer( { id } ) {
    const [ recipe, setRecipe ] = useState( undefined );
    const [ userRecipe, setUserRecipe ] = useState( undefined );
    const [ possibleSubstitues, setPossibleSubstitues ] = useState( undefined );
    const [ showSubstiutesFor, setShowSubstiutesFor ] = useState( '' );
    const [ message, setMessage ] = useState( '' );
    const [ messageType, setMessageType ] = useState( undefined );
    const { user } = useContext( UserStateContext );

    const createCustomRecipe = r => postUserRecipe( {
        origRecipe: r._id,
        ingredients: r.ingredients
            .map( i => ( {
                ingredient: i.ingredient._id, amount: i.amount,
            } ) ),
        blockedSubstitutions: [],
    } );

    const mapCustomRecipeToRecipe = ( r ) => {
        const recipeObject = lodash.cloneDeep( r );
        const { origRecipe } = recipeObject.personalizedRecipe;
        const { ingredients } = recipeObject.personalizedRecipe;
        return {
            ...origRecipe,
            ingredients,
        };
    };

    const getAndSetCustomRecipe = async ( r ) => {
        const personalizedRecipe = r.user
            ? r : await createCustomRecipe( r, user );
        setRecipe( r.user ? mapCustomRecipeToRecipe( r ) : r );
        setUserRecipe( r.user ? r : personalizedRecipe );
        return personalizedRecipe;
    };

    useEffect( () => {
        getUserRecipe( id )
            .then( r => ( lodash.isEmpty( r ) ? getRecipe( id ) : r ) )
            .then( r => getAndSetCustomRecipe( r ) )
            .then( personalizedRecipe => getRecipeSubstitutes( personalizedRecipe._id ) )
            .then( substiutes => setPossibleSubstitues( substiutes ) )
            // eslint-disable-next-line no-console
            .catch( err => console.log( err ) );
    }, [] );

    const substitutesLeft = ( substitutes, ingredients ) => substitutes
        .filter( substitute => ingredients
            .find( ingredient => substitute._id === ingredient.ingredient._id ) )
        .length;

    const onClickIngredient = displayableIngredient => setShowSubstiutesFor(
        displayableIngredient._id,
    );

    const substiuteIndexInRecipe = ( substitute, r ) => r.ingredients
        .findIndex( ingredient => ingredient.ingredient._id === substitute._id );

    const onSelectSubstiute = ( substitue ) => {
        const newIngredient = {
            amount: substitue.amount,
            ingredient: substitue._id,
        };

        const updatedRecipe = lodash.cloneDeep( userRecipe );
        const index = updatedRecipe.personalizedRecipe.ingredients
            .findIndex( ingredient => ingredient.ingredient._id === showSubstiutesFor );
        const substiuteInRecipeIndex = substiuteIndexInRecipe( substitue, recipe );
        if ( substiuteInRecipeIndex === -1 ) {
            // replace selected ingredient by substiute
            updatedRecipe.personalizedRecipe.ingredients[ index ] = newIngredient;
        } else {
            // first add substiute amount to present ingredient
            // and afterwards remove substituted ingredient
            updatedRecipe.personalizedRecipe.ingredients[ substiuteInRecipeIndex ]
                .amount += substitue.amount;
            updatedRecipe.personalizedRecipe.ingredients.splice( index, 1 );
        }

        updateUserRecipe( updatedRecipe ).then( ( newUserRecipe ) => {
            const newRecipe = mapCustomRecipeToRecipe( newUserRecipe );
            const finishedSubs = !substitutesLeft( possibleSubstitues, newRecipe.ingredients );
            setMessage( finishedSubs ? i18n.t( KEYS.MESSAGES.SUBSTITUTION_SUCCESS ) : '' );
            setMessageType( finishedSubs ? MESSAGE_TYPES.SUCCESS : '' );
            setShowSubstiutesFor( '' );
            setUserRecipe( newUserRecipe );
            setRecipe( newRecipe );
        } );
    };

    const onCloseSubstitute = ( substitute ) => {
        const updatedSubstitutes = lodash.cloneDeep( possibleSubstitues );

        const currentIngredient = updatedSubstitutes
            .find( ingredient => ingredient._id === showSubstiutesFor );
        const index = updatedSubstitutes.indexOf( currentIngredient );

        updatedSubstitutes[ index ].substitutes = currentIngredient.substitutes
            .filter( sub => sub.substitute._id !== substitute._id );

        setPossibleSubstitues( updatedSubstitutes );
    };

    const onCloseMessage = () => setMessage( '' ) && setMessageType( undefined );

    const makeIngredientsDisplayable = ingredients => ingredients
        .map( ingredient => ( {
            ...ingredient.ingredient,
            amount: ingredient.amount,
            label: ingredient.ingredient.name[ getLocale() ],
            key: ingredient.ingredient._id,
        } ) );

    const makeSubstituteDisplayable = ingredient => ( {
        ...ingredient.substitute,
        amount: ingredient.amount,
        label: ingredient.substitute.name[ getLocale() ],
        key: ingredient.substitute._id,
    } );


    const renderLoading = () => (
        <Loader key="lodaing-substitues" />
    );

    const renderMessage = () => (
        <Message
            text={message}
            type={messageType}
            onResolve={onCloseMessage}
            classes="cooking-succ-message"
        />
    );

    const renderPossibleSubstitutes = ( substitutes, selectedIngredient ) => substitutes
        .find( subs => subs._id === selectedIngredient._id )
        .substitutes.slice( 0, 3 )
        .map( alt => (
            <Ingredient
                key={alt.substitute._id}
                ingredient={makeSubstituteDisplayable( alt )}
                onClick={onSelectSubstiute}
                onClose={onCloseSubstitute}
            />
        ) );

    const getSubstitutableIngredients = subs => subs
        .map( sub => sub._id );

    const renderModalTitle = selectedIngredient => (
        <h2>
            { i18n.t( KEYS.HEADERS.SELECT_SUBSTITUTE, { ingredient: selectedIngredient.label } )}
        </h2>
    );

    const renderModal = ( displayableSubstitutes, selectedIngredient ) => (
        <Modal
            classes="substitutes-container"
            onCloseModal={() => setShowSubstiutesFor( '' )}
            Title={renderModalTitle( selectedIngredient )}
        >
            { displayableSubstitutes
                ? renderPossibleSubstitutes( displayableSubstitutes, selectedIngredient )
                : [ renderLoading() ]
            }
        </Modal>
    );

    const lastClient = userRecipe ? userRecipe.client.clientId : undefined;

    const displayableRecipe = recipe ? lodash.cloneDeep( recipe ) : undefined;
    if ( displayableRecipe ) {
        displayableRecipe.ingredients = makeIngredientsDisplayable( displayableRecipe.ingredients );
    }

    const substitutableIngredients = displayableRecipe && possibleSubstitues
        ? getSubstitutableIngredients( possibleSubstitues ) : [];

    const selectedIngredient = recipe && showSubstiutesFor ? displayableRecipe.ingredients
        .find( ingredient => ingredient._id === showSubstiutesFor ) : undefined;

    const displayableSubstitutes = possibleSubstitues
        ? lodash.cloneDeep( possibleSubstitues )
        : undefined;

    const SuccessMessage = message ? renderMessage( message, messageType ) : null;

    return (
        <React.Fragment>
            <h1>
                { displayableRecipe
                    ? displayableRecipe.meal
                    : i18n.t( KEYS.HEADERS.COOKING_HEADER )
                }
            </h1>
            { displayableRecipe
                ? (
                    <Recipe
                        lastClient={lastClient}
                        recipe={displayableRecipe}
                        onClickIngredient={onClickIngredient}
                        substitutableIngredients={substitutableIngredients}
                        Message={SuccessMessage}
                    />
                )
                : renderLoading()
            }
            { selectedIngredient
                ? renderModal( displayableSubstitutes, selectedIngredient )
                : null
            }
        </React.Fragment>
    );
}

CookingContainer.propTypes = {
    id: PropTypes.string.isRequired,
};

export default CookingContainer;
