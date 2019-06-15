import React from 'react';
import { Redirect } from 'react-router-dom';
import DataListInput from 'react-datalist-input';

import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';


import { AUTH_ROUTES } from '../App/App';

class RecipesContainer extends React.Component {
    testData = [
        {
            name: 'Bolognese',
            id: 1,
        },
        {
            name: 'Pizza Brot',
            id: 2,
        },
        {
            name: 'Hawai Toast',
            id: 3,
        },
        {
            name: 'Spagghetti Arabiate',
            id: 4,
        },
        {
            name: 'Pilzragout',
            id: 5,
        },
    ];

    constructor( props ) {
        super( props );

        this.state = {
            recipes: undefined,
            selectedId: undefined,
        };
    }

    componentWillMount = () => {
        const { recipes } = this.state;

        if ( !recipes ) {
            // TODO call backend to get standard recipes
            this.setState( { recipes: this.testData } );
        }
    }

    onSelectRecipe = ( recipe ) => {
        if ( !recipe ) return;
        this.setState( { selectedId: recipe.id } );
    }

    mapRecipesToDataListInput = recipes => recipes
        .map( recipe => ( { ...recipe, label: recipe.name, key: recipe.id } ) )

    renderRedirect = id => <Redirect to={`${ AUTH_ROUTES.COOKING }${ id }`} />

    render() {
        const { recipes, selectedId } = this.state;
        const possibleRecipes = this.mapRecipesToDataListInput( lodash.cloneDeep( recipes ) );
        if ( selectedId ) {
            return this.renderRedirect( selectedId );
        }

        return (
            <div className="recipes-container">
                <h2>{i18n.t( KEYS.HEADERS.SELECT_RECIPE )}</h2>
                <div className="input-container">
                    <DataListInput
                        items={possibleRecipes}
                        placeholder={i18n.t( KEYS.LABELS.SELECT_RECIPE_PLACEHOLDER )}
                        onSelect={this.onSelectRecipe}
                        suppressReselect={false}
                        clearInputOnSelect
                    />
                </div>
            </div>
        );
    }
}

export default RecipesContainer;
