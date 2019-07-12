import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { UserStateContext } from '../../provider/UserStateProvider';
import useTaggedRecipes from '../../hooks/useTaggedRecipes';
import useTaggedUserRecipes from '../../hooks/useTaggedUserRecipes';
import useToleratedRecipes from '../../hooks/useToleratedRecipes';
import useLifestyleRecipes from '../../hooks/useLifestyleRecipes';

import { AUTH_ROUTES } from '../App/App';
import Boxgrid from '../../components/boxgrid/boxgrid';


function RecipesGridsContainer() {
    const [ selectedId, setSelectedId ] = useState();
    const { user } = useContext( UserStateContext );

    const taggedRecipes = useTaggedRecipes();
    const taggedUserRecipes = useTaggedUserRecipes();
    const toleratedRecipes = useToleratedRecipes();
    const lifestyleRecipes = useLifestyleRecipes();

    const onSelectRecipe = id => setSelectedId( id );

    const filterRecipesByMeal = meal => taggedRecipes.filter( r => r.meal === meal );

    const renderTitle = title => <h2>{title}</h2>;

    if ( selectedId ) {
        return <Redirect push to={`${ AUTH_ROUTES.COOKING }${ selectedId }`} />;
    }

    const meals = [
        {
            label: i18n.t( KEYS.LABELS.BREAKFAST ),
            name: 'Breakfast',
        },
        {
            label: i18n.t( KEYS.LABELS.LUNCH ),
            name: 'Lunch',
        },
        {
            label: i18n.t( KEYS.LABELS.DINNER ),
            name: 'Dinner',
        },
    ];

    return (
        <div className="box-grids">
            { taggedUserRecipes && taggedUserRecipes.length && user
                ? (
                    <Boxgrid
                        title={renderTitle( i18n.t( KEYS.LABELS.YOUR_FAVORITES ) )}
                        onClick={onSelectRecipe}
                        recipes={taggedUserRecipes}
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
                            title={renderTitle( i18n.t( KEYS.LABELS.TOLERATED_RECIPES ) )}
                            onClick={onSelectRecipe}
                            recipes={toleratedRecipes}
                        />
                    )
                    : null
            }
            {
                meals.map( meal => (
                    <Boxgrid
                        key={meal.name}
                        title={renderTitle( meal.label )}
                        onClick={onSelectRecipe}
                        recipes={filterRecipesByMeal( meal.name )}
                    />
                ) )
            }
        </div>
    );
}

export default RecipesGridsContainer;
