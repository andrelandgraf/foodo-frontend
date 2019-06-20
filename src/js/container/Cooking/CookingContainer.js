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
            .then( userRecipe => !lodash.isEmpty( userRecipe ) || getRecipe( id ) )
            .then( recipe => this.getAndSetCustomRecipe( recipe, user ) )
            .then( personalizedRecipe => getRecipeSubstitutes( personalizedRecipe._id ) )
            .then( possibleSubstitues => this.setState( { possibleSubstitues } ) )
            // eslint-disable-next-line no-console
            .catch( err => console.log( err ) );
    }

    createCustomRecipe = recipe => postUserRecipe( {
        origRecipe: recipe._id,
        ingredients: recipe.ingredients,
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
        console.log( recipe );
        const personalizedRecipe = recipe.user
            ? recipe : await this.createCustomRecipe( recipe, user );
        console.log( personalizedRecipe );
        this.setState( {
            recipe: recipe.user ? this.mapCustomRecipeToRecipe( recipe ) : recipe,
            userRecipe: recipe.user ? recipe : personalizedRecipe,
        } );
        return personalizedRecipe;
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
        .map( ingredient => <Ingredient key={ingredient._id} ingredient={ingredient} /> )

    render() {
        const { recipe, userRecipe, possibleSubstitues } = this.state;
        const lastClient = userRecipe ? userRecipe.clientId : undefined;

        if ( recipe ) {
            recipe.ingredients = this.makeIngredientsDisplayable( recipe.ingredients );
        }

        let displayableSubstitutes = lodash.cloneDeep( possibleSubstitues );
        if ( possibleSubstitues ) {
            displayableSubstitutes = this.makeIngredientsDisplayable( possibleSubstitues );
        }

        return (
            <React.Fragment>
                { recipe
                    ? <Recipe lastClient={lastClient} recipe={recipe} />
                    : this.renderLoading()
                }
                { displayableSubstitutes
                    ? this.renderPossibleSubstitues( displayableSubstitutes )
                    : this.renderLoading()
                }
            </React.Fragment>
        );
    }
}

CookingContainer.propTypes = {
    id: PropTypes.string.isRequired,
};

export default CookingContainer;
