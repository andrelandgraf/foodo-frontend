import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import Recipe from '../../components/recipe/recipe';
import Loader from '../../components/loading/loader';
import { getUserRecipe, getRecipe } from '../../services/foodo-api/recipe/recipesService';

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

    renderLoading = () => (
        <Loader />
    );

    render() {
        const { recipe, userRecipe } = this.state;
        const lastClient = userRecipe ? userRecipe.clientId : undefined;

        return (
            <div className="cooking-container">
                {
                    recipe
                        ? <Recipe lastClient={lastClient} recipe={recipe} />
                        : this.renderLoading()
                }
            </div>
        );
    }
}

CookingContainer.propTypes = {
    id: PropTypes.string.isRequired,
};

export default CookingContainer;
