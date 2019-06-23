import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import i18n from 'i18next';

import { getLocale, KEYS } from '../../utilities/internationalization/internationalization';

import {
    getUserRecipe, getRecipe, postUserRecipe, getRecipeSubstitutes, updateUserRecipe,
} from '../../services/foodo-api/recipe/recipesService';

import Recipe from '../../components/recipe/recipe';
import Loader from '../../components/loading/loader';
import Ingredient from '../../components/ingredient/ingredient';
import Modal from '../../components/modal/modal';
import Message, { MESSAGE_TYPES } from '../../components/message/message';

class CookingContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            recipe: undefined,
            userRecipe: undefined,
            possibleSubstitues: undefined,
            showSubstiutesFor: '',
            message: '',
            messageType: undefined,
        };
    }

    componentDidMount = () => {
        const { id } = this.props;
        const { user } = this.context;

        getUserRecipe( id )
            .then( userRecipe => ( lodash.isEmpty( userRecipe ) ? getRecipe( id ) : userRecipe ) )
            .then( recipe => this.getAndSetCustomRecipe( recipe, user ) )
            .then( personalizedRecipe => getRecipeSubstitutes( personalizedRecipe._id ) )
            .then( possibleSubstitues => this.setState( { possibleSubstitues } ) )
            // eslint-disable-next-line no-console
            .catch( err => console.log( err ) );
    }

    createCustomRecipe = recipe => postUserRecipe( {
        origRecipe: recipe._id,
        ingredients: recipe.ingredients
            .map( i => ( {
                ingredient: i.ingredient._id, amount: i.amount,
            } ) ),
        blockedSubstitutions: [],
    } );

    mapCustomRecipeToRecipe = ( recipe ) => {
        const recipeObject = lodash.cloneDeep( recipe );
        const { origRecipe } = recipeObject.personalizedRecipe;
        const { ingredients } = recipeObject.personalizedRecipe;
        return {
            ...origRecipe,
            ingredients,
        };
    }

    getAndSetCustomRecipe = async ( recipe, user ) => {
        const personalizedRecipe = recipe.user
            ? recipe : await this.createCustomRecipe( recipe, user );
        this.setState( {
            recipe: recipe.user ? this.mapCustomRecipeToRecipe( recipe ) : recipe,
            userRecipe: recipe.user ? recipe : personalizedRecipe,
        } );
        return personalizedRecipe;
    }

    substitutesLeft = ( possibleSubstitues, recipe ) => possibleSubstitues
        .filter( substitute => recipe.ingredients
            .find( ingredient => substitute._id === ingredient.ingredient._id ) )
        .length;

    onClickIngredient = ( ingredient ) => {
        this.setState( { showSubstiutesFor: ingredient._id } );
    }

    onSelectSubstiute = ( substitue ) => {
        const { userRecipe, showSubstiutesFor, possibleSubstitues } = this.state;

        const newIngredient = {
            amount: substitue.amount,
            ingredient: substitue._id,
        };

        const updatedRecipe = lodash.cloneDeep( userRecipe );
        const index = updatedRecipe.personalizedRecipe.ingredients
            .findIndex( ingredient => ingredient.ingredient._id === showSubstiutesFor );
        updatedRecipe.personalizedRecipe.ingredients[ index ] = newIngredient;

        updateUserRecipe( updatedRecipe ).then( ( newUserRecipe ) => {
            const recipe = this.mapCustomRecipeToRecipe( newUserRecipe );
            let message = {};
            if ( !this.substitutesLeft( possibleSubstitues, recipe ) ) {
                message = {
                    message: i18n.t( KEYS.MESSAGES.SUBSTITUTION_SUCCESS ),
                    messageType: MESSAGE_TYPES.SUCCESS,
                };
            }
            this.setState( {
                showSubstiutesFor: '',
                userRecipe: newUserRecipe,
                recipe,
                ...message,
            } );
        } );
    }

    onCloseModal = () => this.setState( { showSubstiutesFor: '' } );

    onCloseSubstitute = ( substitute ) => {
        const { possibleSubstitues, showSubstiutesFor } = this.state;

        const updatedSubstitutes = lodash.cloneDeep( possibleSubstitues );

        const currentIngredient = updatedSubstitutes
            .find( ingredient => ingredient._id === showSubstiutesFor );
        const index = updatedSubstitutes.indexOf( currentIngredient );

        updatedSubstitutes[ index ].substitutes = currentIngredient.substitutes
            .filter( sub => sub.substitute._id !== substitute._id );

        this.setState( { possibleSubstitues: updatedSubstitutes } );
    }

    onCloseMessage = () => this.setState( { message: '', messageType: undefined } );

    makeIngredientsDisplayable = ingredients => ingredients
        .map( ingredient => ( {
            ...ingredient.ingredient,
            amount: ingredient.amount,
            label: ingredient.ingredient.name[ getLocale() ],
            key: ingredient.ingredient._id,
        } ) );

    makeSubstituteDisplayable = ingredient => ( {
        ...ingredient.substitute,
        amount: ingredient.amount,
        label: ingredient.substitute.name[ getLocale() ],
        key: ingredient.substitute._id,
    } );


    renderLoading = () => (
        <Loader />
    );

    renderMessage = ( message, messageType ) => (
        <Message
            text={message}
            type={messageType}
            onResolve={this.onCloseMessage}
            classes="cooking-succ-message"
        />
    );

    renderPossibleSubstitutes = ( substitutes, selectedIngredient ) => substitutes
        .find( subs => subs._id === selectedIngredient._id )
        .substitutes.slice( 0, 3 )
        .map( alt => (
            <Ingredient
                key={alt.substitute._id}
                ingredient={this.makeSubstituteDisplayable( alt )}
                onClick={this.onSelectSubstiute}
                onClose={this.onCloseSubstitute}
            />
        ) )

    getSubstitutableIngredients = possibleSubstitues => possibleSubstitues
        .map( sub => sub._id );

    renderModalTitle = selectedIngredient => (
        <h2>
            { i18n.t( KEYS.HEADERS.SELECT_SUBSTITUTE, { ingredient: selectedIngredient.label } )}
        </h2>
    );

    renderModal = ( displayableSubstitutes, selectedIngredient ) => (
        <Modal
            classes="substitutes-container"
            onCloseModal={this.onCloseModal}
            Title={this.renderModalTitle( selectedIngredient )}
        >
            { displayableSubstitutes
                ? this.renderPossibleSubstitutes( displayableSubstitutes, selectedIngredient )
                : this.renderLoading()
            }
        </Modal>
    )

    render() {
        const {
            recipe, userRecipe, possibleSubstitues, showSubstiutesFor, message, messageType,
        } = this.state;
        const lastClient = userRecipe ? userRecipe.client.clientId : undefined;

        const displayableRecipe = recipe ? lodash.cloneDeep( recipe ) : undefined;
        if ( displayableRecipe ) {
            displayableRecipe.ingredients = this
                .makeIngredientsDisplayable( displayableRecipe.ingredients );
        }

        const substitutableIngredients = displayableRecipe && possibleSubstitues
            ? this.getSubstitutableIngredients( possibleSubstitues ) : [];

        const selectedIngredient = recipe && showSubstiutesFor ? displayableRecipe.ingredients
            .find( ingredient => ingredient._id === showSubstiutesFor ) : undefined;

        const displayableSubstitutes = possibleSubstitues
            ? lodash.cloneDeep( possibleSubstitues )
            : undefined;

        const SuccessMessage = message ? this.renderMessage( message, messageType ) : null;

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
                            onClickIngredient={this.onClickIngredient}
                            substitutableIngredients={substitutableIngredients}
                            Message={SuccessMessage}
                        />
                    )
                    : this.renderLoading()
                }
                { selectedIngredient
                    ? this.renderModal( displayableSubstitutes, selectedIngredient )
                    : null
                }
            </React.Fragment>
        );
    }
}

CookingContainer.propTypes = {
    id: PropTypes.string.isRequired,
};

export default CookingContainer;
