import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';

import { getIngredients } from '../../services/ingredientsService';

import Tags from '../../components/tags/tags';
import SubmitButton from '../../components/button/submitButton';

const IngredientSelection = ( {
    ingredients, onDeleteIngredient, onSelectIngredient, possibleMatches,
} ) => (
    <div className="ingredients-container">
        <h2>Select the ingredients</h2>
        {
            ingredients.length > 0
                    && <Tags tags={ingredients} onDelete={onDeleteIngredient} />
        }
        <div className="input-container">
            <DataListInput
                items={possibleMatches}
                placeholder="ingredients..."
                onSelect={onSelectIngredient}
                dropDownLength={20}
                suppressReselect={false}
                clearInputOnSelect
            />
        </div>
    </div>
);

IngredientSelection.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape( {
            name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        } ),
    ).isRequired,
    onDeleteIngredient: PropTypes.func.isRequired,
    onSelectIngredient: PropTypes.func.isRequired,
    possibleMatches: PropTypes.arrayOf(
        PropTypes.shape( {
            label: PropTypes.string.isRequired,
            key: PropTypes.number.isRequired,
        } ),
    ).isRequired,
};

class AdminContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            recipe: {
                ingredients: [],
                name: '',
                preparationTime: undefined,
                meal: '',
                directions: '',
                servings: [],
            },
            foodItems: [],
            selectedIngredients: [],
        };
    }

    componentWillMount = async () => {
        getIngredients().then( ingredients => this.setState( { foodItems: ingredients } ) );
    }

    onSaveRecipe = ( event ) => {
        event.preventDefault();
        // TODO save recipe to backend
        const nextRecipe = {
            name: '',
            preparationTime: 0,
            meal: '',
            ingredients: [],
            directions: '',
            servings: [],
        };
        this.setState( { recipe: nextRecipe } );
    }

    onChangeName = ( event ) => {
        const { recipe } = this.state;
        const { value } = event.target;
        const updatedRecipe = lodash.cloneDeep( recipe );
        updatedRecipe.name = value;
        this.setState( { recipe: updatedRecipe } );
    }

    onChangeTime = ( event ) => {
        const { recipe } = this.state;
        const { value } = event.target;
        const updatedRecipe = lodash.cloneDeep( recipe );
        updatedRecipe.preparationTime = value;
        this.setState( { recipe: updatedRecipe } );
    }

    onChangeMeal = ( event ) => {
        const { recipe } = this.state;
        const { value } = event.target;
        const updatedRecipe = lodash.cloneDeep( recipe );
        updatedRecipe.meal = value;
        this.setState( { recipe: updatedRecipe } );
    }

    onChangeDirections = ( event ) => {
        const { recipe } = this.state;
        const { value } = event.target;
        const updatedRecipe = lodash.cloneDeep( recipe );
        updatedRecipe.directions = value;
        this.setState( { recipe: updatedRecipe } );
    }

    onSelectIngredient = ( item ) => {
        const { recipe, selectedIngredients } = this.state;
        const { ingredients } = recipe;
        if ( selectedIngredients.find( ingredient => ingredient.id === item.id ) ) return;

        const updatedIngredients = lodash.cloneDeep( ingredients );
        const updatedSelectedIngredients = lodash.cloneDeep( selectedIngredients );

        updatedSelectedIngredients.push( item );
        updatedIngredients.push( {
            id: item.id,
            amount: 0,
        } );

        const updatedRecipe = lodash.cloneDeep( recipe );
        updatedRecipe.ingredients = updatedIngredients;
        this.setState( { recipe: updatedRecipe, selectedIngredients: updatedSelectedIngredients } );
    }

    onDeleteIngredient = ( itemId ) => {
        const { recipe, selectedIngredients } = this.state;
        const { ingredients } = recipe;

        let updatedIngredients = lodash.cloneDeep( ingredients );
        updatedIngredients = updatedIngredients
            .filter( ingredient => ingredient.id !== itemId );

        let updatedSelectedIngredients = lodash.cloneDeep( selectedIngredients );
        updatedSelectedIngredients = updatedSelectedIngredients
            .filter( ingredient => ingredient.id !== itemId );

        const updatedRecipe = lodash.cloneDeep( recipe );
        updatedRecipe.ingredients = updatedIngredients;
        this.setState( { recipe: updatedRecipe, selectedIngredients: updatedSelectedIngredients } );
    }

    onChangeAmount = ( event, ingredient ) => {
        const { recipe } = this.state;
        const { ingredients } = recipe;

        const updatedIngredient = lodash.cloneDeep( ingredient );
        updatedIngredient.amount = Number( event.target.value );

        const updatedIngredients = lodash.cloneDeep( ingredients );
        const index = updatedIngredients
            .findIndex( i => i.id === ingredient.id );
        updatedIngredients[ index ] = updatedIngredient;

        const updatedRecipe = lodash.cloneDeep( recipe );
        updatedRecipe.ingredients = updatedIngredients;
        this.setState( { } );
    }

    removeAlreadySelectedItems = ( dislikes, foodItems ) => foodItems
        .filter( item => !( dislikes.find( dislike => dislike.id === item.id ) ) );

    mapFoodItemsForDataListInput = foodItems => foodItems
        .map( item => ( {
            ...item,
            key: item.id,
            label: item.name,
        } ) );


    render() {
        const { recipe, foodItems, selectedIngredients } = this.state;
        const { ingredients } = recipe;
        const clonedFoodItems = lodash.cloneDeep( foodItems );
        let possibleMatches = this
            .removeAlreadySelectedItems( selectedIngredients, clonedFoodItems );
        possibleMatches = this.mapFoodItemsForDataListInput( possibleMatches );

        return (
            <form onSubmit={this.onSaveRecipe} className="admin-form">
                <div>
                    <h2>Recipe Name (in German)</h2>
                    <input
                        value={recipe.name}
                        onChange={this.onChangeName}
                        placeholder="Choose a name..."
                        required
                    />
                </div>
                <div>
                    <h2>Recipe Preparation Time</h2>
                    <input
                        value={recipe.preparationTime}
                        onChange={this.onChangeTime}
                        type="number"
                        placeholder="Choose a number..."
                        required
                    />
                </div>
                <div>
                    <h2>Meal</h2>
                    <input
                        value={recipe.meal}
                        onChange={this.onChangeMeal}
                        placeholder="Choose a meal..."
                        required
                    />
                </div>
                <div>
                    <h2>Directions</h2>
                    <input
                        value={recipe.directions}
                        onChange={this.onChangeDirections}
                        placeholder="Choose a direction..."
                    />
                </div>
                <IngredientSelection
                    ingredients={selectedIngredients}
                    possibleMatches={possibleMatches}
                    onSelectIngredient={this.onSelectIngredient}
                    onDeleteIngredient={this.onDeleteIngredient}
                />
                {
                    selectedIngredients.map( ( selected, i ) => (
                        <div>
                            <h2>{ingredients[ i ].name}</h2>
                            <input
                                value={selected.name}
                                type="number"
                                onChange={e => this.onChangeAmount( e, selected )}
                                placeholder="Choose an amount..."
                                required
                            />
                        </div>
                    ) )
                }
                <SubmitButton label="save recipe" />
            </form>
        );
    }
}

export default AdminContainer;