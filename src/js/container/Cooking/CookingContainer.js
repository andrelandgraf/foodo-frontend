import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import i18n from 'i18next';

import { getLocale, KEYS } from '../../utilities/internationalization/internationalization';

import Recipe from '../../components/recipe/recipe';
import Loader from '../../components/loading/loader';
import {
    getUserRecipe, getRecipe, postUserRecipe, getRecipeSubstitutes,
} from '../../services/foodo-api/recipe/recipesService';
import Ingredient from '../../components/ingredient/ingredient';
import Modal from '../../components/modal/modal';

class CookingContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            recipe: undefined,
            userRecipe: undefined,
            possibleSubstitues: undefined,
            showSubstiutesFor: '5d0934799a8ab5830d9eda3b',
        };
    }

    componentWillMount = () => {
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

    onClickIngredient = ( ingredient ) => {
        this.setState( { showSubstiutesFor: ingredient._id } );
    }

    onSelectSubstiute = ( substitue ) => {
        // eslint-disable-next-line no-console
        console.log( substitue );
    }

    onCloseModal = () => this.setState( { showSubstiutesFor: '' } );

    onCloseSubstitute = ( substitute ) => {
        const { possibleSubstitues } = this.state;
        const updatedSubstitutes = lodash
            .cloneDeep( possibleSubstitues )
            .filter( sub => sub.ingredient._id !== substitute._id );
        this.setState( { possibleSubstitues: updatedSubstitutes } );
    }

    makeIngredientsDisplayable = ingredients => ingredients
        .map( ingredient => ( {
            ...ingredient.ingredient,
            amount: ingredient.amount,
            label: ingredient.ingredient.name[ getLocale() ],
            key: ingredient.ingredient._id,
        } ) );

    renderLoading = () => (
        <Loader />
    );

    renderPossibleSubstitutes = ( substitutes, selectedIngredient ) => substitutes
        .find( subs => subs._id === selectedIngredient._id )
        .alternatives.map( alt => (
            <Ingredient
                key={alt._id}
                ingredient={this.makeIngredientsDisplayable( alt )}
                onClick={this.onSelectSubstiute}
                onClose={this.onCloseSubstitute}
            />
        ) )

    getSubstitutableIngredients = possibleSubstitues => possibleSubstitues.map( sub => sub._id );

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
            recipe, userRecipe, possibleSubstitues, showSubstiutesFor,
        } = this.state;
        const lastClient = userRecipe ? userRecipe.clientId : undefined;

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

        console.log( possibleSubstitues );

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
