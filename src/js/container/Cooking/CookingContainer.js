import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import Recipe from '../../components/recipe/recipe';
import Loader from '../../components/loading/loader';
import { getUserRecipe, getRecipe } from '../../services/foodo-api/recipe/recipesService';
import Ingredient from '../../components/ingredient/ingredient';
import { getLocale } from '../../utilities/internationalization/internationalization';

class CookingContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            recipe: undefined,
            userRecipe: undefined,
        };
    }

    componentWillMount = () => {
        const { id } = this.props;

        getUserRecipe( id )
            .then( recipe => recipe || getRecipe( id ) )
            .then( recipe => this.setState( {
                recipe: recipe.user ? this.mapCustomRecipeToRecipe( recipe ) : recipe,
                userRecipe: recipe.user ? recipe : undefined,
            } ) );
    }

    mapCustomRecipeToRecipe = ( recipe ) => {
        const recipeObject = lodash.cloneDeep( recipe );
        const { origRecipe } = recipeObject.personalizedRecipe;
        const { ingredients } = recipeObject.personalizedRecipe;
        return {
            ...origRecipe,
            ingredients,
        };
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
        .map( ingredient => <Ingredient ingredient={ingredient} /> )

    render() {
        const { recipe, userRecipe } = this.state;
        const lastClient = userRecipe ? userRecipe.clientId : undefined;
        if ( recipe ) {
            recipe.ingredients = this.makeIngredientsDisplayable( recipe.ingredients );
        }

        return (
            <React.Fragment>
                {
                    recipe
                        ? <Recipe lastClient={lastClient} recipe={recipe} />
                        : this.renderLoading()
                }
                { recipe && this.renderPossibleSubstitues( recipe.ingredients ) }
            </React.Fragment>
        );
    }
}

CookingContainer.propTypes = {
    id: PropTypes.string.isRequired,
};

export default CookingContainer;
