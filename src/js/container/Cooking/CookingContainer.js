import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import Recipe from '../../components/recipe/recipe';
import Loader from '../../components/loading/loader';
import {
    getUserRecipe, getRecipe, postUserRecipe, getRecipeSubstitutes,
} from '../../services/foodo-api/recipe/recipesService';
import Ingredient from '../../components/ingredient/ingredient';
import { getLocale } from '../../utilities/internationalization/internationalization';

class CookingContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            recipe: undefined,
            userRecipe: undefined,
            possibleSubstitues: undefined,
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

    onSelectSubstiute = ( substitue ) => {
        // eslint-disable-next-line no-console
        console.log( substitue );
    }

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

    renderPossibleSubstitues = ingredients => ingredients
        .map( ingredient => (
            <Ingredient
                key={ingredient._id}
                ingredient={ingredient}
                onClick={this.onSelectSubstiute}
                onClose={this.onCloseSubstitute}
            />
        ) )

    render() {
        const { recipe, userRecipe, possibleSubstitues } = this.state;
        const lastClient = userRecipe ? userRecipe.clientId : undefined;

        const displayableRecipe = lodash.cloneDeep( recipe );
        if ( displayableRecipe ) {
            displayableRecipe.ingredients = this
                .makeIngredientsDisplayable( displayableRecipe.ingredients );
        }

        let displayableSubstitutes = lodash.cloneDeep( possibleSubstitues );
        if ( possibleSubstitues ) {
            displayableSubstitutes = this.makeIngredientsDisplayable( possibleSubstitues );
        }

        return (
            <React.Fragment>
                { displayableRecipe
                    ? <Recipe lastClient={lastClient} recipe={displayableRecipe} />
                    : this.renderLoading()
                }
                <div className="substitutes-container">
                    { displayableSubstitutes
                        ? this.renderPossibleSubstitues( displayableSubstitutes )
                        : this.renderLoading()
                    }
                </div>
            </React.Fragment>
        );
    }
}

CookingContainer.propTypes = {
    id: PropTypes.string.isRequired,
};

export default CookingContainer;
