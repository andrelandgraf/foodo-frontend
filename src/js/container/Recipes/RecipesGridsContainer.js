/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { UserStateContext } from '../../provider/UserStateProvider';
import useDisplayableRecipes from '../../hooks/useDisplayableRecipes';
import useDisplayableUserRecipes from '../../hooks/useDisplayableUserRecipes';

import { AUTH_ROUTES } from '../App/App';
import Boxgrid from '../../components/boxgrid/boxgrid';

function RecipesGridsContainer() {
    const [ selectedId, setSelectedId ] = useState();
    const displayableRecipes = useDisplayableRecipes();
    const displayableUserRecipes = useDisplayableUserRecipes();
    const { user } = useContext( UserStateContext );

    const onSelectRecipe = id => setSelectedId( id );

    const filterRecipesByMeal = meal => displayableRecipes.filter( r => r.meal === meal );

    const renderTitle = title => <h2>{title}</h2>;

    if ( selectedId ) {
        return <Redirect push to={`${ AUTH_ROUTES.COOKING }${ selectedId }`} />;
    }

    const meals = [
        'Breakfast',
        'Lunch',
        'Dinner',
    ];

    return (
        <div className="box-grids">
            <Boxgrid
                title={renderTitle( 'Your Favorites' )}
                onClick={onSelectRecipe}
                recipes={displayableUserRecipes}
            />
            {
                meals.map( meal => (
                    <Boxgrid
                        key={meal}
                        title={renderTitle( meal )}
                        onClick={onSelectRecipe}
                        recipes={filterRecipesByMeal( meal )}
                    />
                ) )
            }
        </div>
    );
}

export default RecipesGridsContainer;
