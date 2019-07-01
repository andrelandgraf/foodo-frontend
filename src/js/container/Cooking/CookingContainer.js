import React, {
    useState, useEffect, useContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import i18n from 'i18next';

import { getLocale, KEYS } from '../../utilities/internationalization/internationalization';

import {
    getUserRecipe, getRecipe, postUserRecipe, getRecipeSubstitutes, updateUserRecipe,
} from '../../services/foodo-api/recipe/recipesService';

import { UserStateContext } from '../../provider/UserStateProvider';
import { UserRecipeContext } from '../../provider/UserRecipeProvider';

import Recipe from '../../components/recipe/recipe';
import Loader from '../../components/loading/loader';
import Ingredient from '../../components/ingredient/ingredient';
import EditIngredients from '../Ingredients/EditIngredientsContainer';
import Modal from '../../components/modal/modal';
import Message, { MESSAGE_TYPES } from '../../components/message/message';

function CookingContainer( { id } ) {
    const [ possibleSubstitues, setPossibleSubstitues ] = useState( undefined );
    const [ showSubstiutesFor, setShowSubstiutesFor ] = useState( '' );
    const [ showEditInrgedients, setShowEditIngredients ] = useState( false );

    const [ message, setMessage ] = useState( '' );
    const [ messageType, setMessageType ] = useState( undefined );

    const { userRecipe, setUserRecipe } = useContext( UserRecipeContext );
    const { user } = useContext( UserStateContext );

    const createCustomRecipe = r => postUserRecipe( {
        origRecipe: r._id,
        ingredients: r.ingredients
            .map( i => ( {
                ingredient: i.ingredient._id, amount: i.amount,
            } ) ),
        blockedSubstitutions: [],
    } );

    const getAndSetCustomRecipe = async ( r ) => {
        const personalizedRecipe = r.user
            ? r : await createCustomRecipe( r, user );
        setUserRecipe( r.user ? r : personalizedRecipe );
        return personalizedRecipe;
    };

    useEffect( () => {
        getUserRecipe( id )
            .then( r => ( lodash.isEmpty( r ) ? getRecipe( id ) : r ) )
            .then( r => getAndSetCustomRecipe( r ) );
    }, [] );

    useEffect( () => {
        if ( userRecipe ) {
            getRecipeSubstitutes( userRecipe._id )
                .then( substitutes => setPossibleSubstitues( substitutes ) );
        }
    }, [ userRecipe ] );

    const substitutesLeft = ( substitutes, ingredients ) => substitutes
        .filter( substitute => ingredients
            .find( ingredient => substitute._id === ingredient.ingredient._id ) )
        .length;

    const substiuteIndexInRecipe = ( substitute, ingredients ) => ingredients
        .findIndex( ingredient => ingredient.ingredient._id === substitute.key );

    const getSubstitutableIngredients = subs => subs
        .map( sub => sub._id );

    const onClickIngredient = displayableIngredient => setShowSubstiutesFor(
        displayableIngredient._id,
    );

    const onClickEdit = () => setShowEditIngredients( true );

    const onSelectSubstiute = ( substitue ) => {
        const newIngredient = {
            amount: substitue.amount,
            ingredient: substitue._id,
        };

        const updatedRecipe = lodash.cloneDeep( userRecipe );
        const clonedIngredients = updatedRecipe.personalizedRecipe.ingredients;
        const index = clonedIngredients
            .findIndex( ingredient => ingredient.ingredient._id === showSubstiutesFor );
        const substiuteInRecipeIndex = substiuteIndexInRecipe( substitue, clonedIngredients );
        if ( substiuteInRecipeIndex === -1 ) {
            // replace selected ingredient by substiute
            clonedIngredients[ index ] = newIngredient;
        } else {
            // first add substiute amount to present ingredient
            // and afterwards remove substituted ingredient
            clonedIngredients[ substiuteInRecipeIndex ].amount += substitue.amount;
            clonedIngredients.splice( index, 1 );
        }

        updateUserRecipe( updatedRecipe ).then( ( newUserRecipe ) => {
            const finishedSubs = !substitutesLeft(
                possibleSubstitues, newUserRecipe.personalizedRecipe.ingredients,
            );
            const loveEmote = String.fromCodePoint( 128525 );
            setMessage( finishedSubs ? `${ i18n.t( KEYS.MESSAGES.SUBSTITUTION_SUCCESS ) } ${ loveEmote }` : '' );
            setMessageType( finishedSubs ? MESSAGE_TYPES.SUCCESS : '' );
            setShowSubstiutesFor( '' );
            setUserRecipe( newUserRecipe );
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

    const onCloseEditIngredients = () => setShowEditIngredients( false );

    const mapCustomRecipeToRecipe = ( r ) => {
        const { origRecipe, ingredients } = r.personalizedRecipe;
        return {
            ...origRecipe,
            ingredients,
        };
    };

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

    const renderModalTitle = selectedIngredient => (
        <h2>
            { i18n.t( KEYS.HEADERS.SELECT_SUBSTITUTE, { ingredient: selectedIngredient.label } )}
        </h2>
    );

    const renderModal = ( displayableSubstitutes, selectedIngredient ) => (
        <Modal
            classes="ingredients-container"
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

    const displayableRecipe = useMemo( () => {
        let recipe = userRecipe ? lodash.cloneDeep( userRecipe ) : undefined;
        if ( recipe ) {
            recipe = mapCustomRecipeToRecipe( recipe );
            recipe.ingredients = makeIngredientsDisplayable( recipe.ingredients );
        }
        return recipe;
    }, [ userRecipe ] );

    const displayableOrigRecipe = useMemo( () => {
        const displayable = userRecipe
            ? lodash.cloneDeep( userRecipe.personalizedRecipe.origRecipe )
            : undefined;
        if ( displayable ) {
            displayable.ingredients = makeIngredientsDisplayable( displayable.ingredients );
        }
        return displayable;
    }, [ userRecipe ] );

    const substitutableIngredients = useMemo( () => ( displayableRecipe && possibleSubstitues
        ? getSubstitutableIngredients( possibleSubstitues ) : [] ), [ possibleSubstitues ] );

    const selectedIngredient = useMemo( () => ( userRecipe && showSubstiutesFor
        ? displayableRecipe.ingredients
            .find( ingredient => ingredient._id === showSubstiutesFor )
        : undefined ), [ showSubstiutesFor ] );

    const displayableSubstitutes = useMemo( () => ( possibleSubstitues
        ? lodash.cloneDeep( possibleSubstitues )
        : undefined ), [ possibleSubstitues ] );

    const SuccessMessage = message ? renderMessage( message, messageType ) : null;

    return (
        <React.Fragment>
            <h1>
                { displayableRecipe
                    ? displayableRecipe.meal
                    : i18n.t( KEYS.HEADERS.COOKING_HEADER )
                }
            </h1>
            { displayableRecipe && displayableOrigRecipe
                ? (
                    <Recipe
                        lastClient={lastClient}
                        recipe={displayableRecipe}
                        origRecipe={displayableOrigRecipe}
                        onClickIngredient={onClickIngredient}
                        onEdit={onClickEdit}
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
            { showEditInrgedients
                ? (
                    <EditIngredients
                        onCloseEditIngredients={onCloseEditIngredients}
                    />
                )
                : null
            }
        </React.Fragment>
    );
}

CookingContainer.propTypes = {
    id: PropTypes.string.isRequired,
};

export default CookingContainer;
