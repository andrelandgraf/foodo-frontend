import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { UserStateContext } from '../../provider/UserStateProvider';
import useTaggedRecipes from '../../hooks/useTaggedRecipes';
import useDisplayableUserRecipes from '../../hooks/useDisplayableUserRecipes';
import useToleratedRecipes from '../../hooks/useToleratedRecipes';
import useLifestyleRecipes from '../../hooks/useLifestyleRecipes';

import { AUTH_ROUTES } from '../App/App';
import Boxgrid from '../../components/boxgrid/boxgrid';


function RecipesGridsContainer() {
    const [ selectedId, setSelectedId ] = useState();
    const { user } = useContext( UserStateContext );
    const taggedRecipes = useTaggedRecipes();
    const displayableUserRecipes = useDisplayableUserRecipes();
    const toleratedRecipes = useToleratedRecipes();
    const lifestyleRecipes = useLifestyleRecipes();

    const onSelectRecipe = id => setSelectedId( id );

    const filterRecipesByMeal = meal => taggedRecipes.filter( r => r.meal === meal );

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
            { displayableUserRecipes && displayableUserRecipes.length
                ? (
                    <Boxgrid
                        title={renderTitle( 'Your Favorites' )}
                        onClick={onSelectRecipe}
                        recipes={displayableUserRecipes}
                    />
                )
                : null
            }
            {
                lifestyleRecipes && lifestyleRecipes.length && user && user.lifestyle
                    ? (
                        <Boxgrid
                            title={renderTitle( user.lifestyle.name )}
                            onClick={onSelectRecipe}
                            recipes={lifestyleRecipes}
                        />
                    )
                    : null
            }
            {
                toleratedRecipes && toleratedRecipes.length && user && user.allergies.length
                    ? (
                        <Boxgrid
                            title={renderTitle( 'Tolerated Recipes' )}
                            onClick={onSelectRecipe}
                            recipes={toleratedRecipes}
                        />
                    )
                    : null
            }
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
