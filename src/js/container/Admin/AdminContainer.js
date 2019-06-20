import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';

import { getIngredients } from '../../services/foodo-api/ingredient/ingredientsService';
import { postRecipe } from '../../services/foodo-api/recipe/recipesService';

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
            label: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        } ),
    ).isRequired,
    onDeleteIngredient: PropTypes.func.isRequired,
    onSelectIngredient: PropTypes.func.isRequired,
    possibleMatches: PropTypes.arrayOf(
        PropTypes.shape( {
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
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
                preparationTime: '',
                meal: '',
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

        const { recipe } = this.state;

        const recipeToSave = lodash.cloneDeep( recipe );
        recipeToSave.ingredients = recipeToSave.ingredients
            .map( i => ( { ingredient: i._id, amount: i.amount } ) );

        // eslint-disable-next-line no-console
        postRecipe( recipeToSave ).catch( err => console.log( err ) );

        const nextRecipe = {
            name: '',
            preparationTime: 0,
            meal: '',
            ingredients: [],
            directions: '',
            servings: [],
        };
        this.setState( { recipe: nextRecipe, selectedIngredients: [] } );
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
        if ( selectedIngredients.find( ingredient => ingredient._id === item._id ) ) return;

        const updatedIngredients = lodash.cloneDeep( ingredients );
        const updatedSelectedIngredients = lodash.cloneDeep( selectedIngredients );

        updatedSelectedIngredients.push( item );
        updatedIngredients.push( {
            _id: item._id,
            amount: '',
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
            .filter( ingredient => ingredient._id !== itemId );

        let updatedSelectedIngredients = lodash.cloneDeep( selectedIngredients );
        updatedSelectedIngredients = updatedSelectedIngredients
            .filter( ingredient => ingredient._id !== itemId );

        const updatedRecipe = lodash.cloneDeep( recipe );
        updatedRecipe.ingredients = updatedIngredients;
        this.setState( { recipe: updatedRecipe, selectedIngredients: updatedSelectedIngredients } );
    }

    onChangeAmount = ( event, ingredient ) => {
        const { recipe } = this.state;
        const { ingredients } = recipe;

        const updatedIngredient = lodash.cloneDeep( ingredient );
        updatedIngredient.amount = event.target.value;

        const updatedIngredients = lodash.cloneDeep( ingredients );
        const index = updatedIngredients
            .findIndex( i => i._id === ingredient._id );
        updatedIngredients[ index ] = updatedIngredient;

        const updatedRecipe = lodash.cloneDeep( recipe );
        updatedRecipe.ingredients = updatedIngredients;
        this.setState( { recipe: updatedRecipe } );
    }

    removeAlreadySelectedItems = ( dislikes, foodItems ) => foodItems
        .filter( item => !( dislikes.find( dislike => dislike._id === item._id ) ) );

    mapFoodItemsForDataListInput = foodItems => foodItems
        .map( item => ( {
            ...item,
            key: item._id,
            label: item.name.en,
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
                    <h2>Recipe Name (in English)</h2>
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
                <IngredientSelection
                    ingredients={selectedIngredients}
                    possibleMatches={possibleMatches}
                    onSelectIngredient={this.onSelectIngredient}
                    onDeleteIngredient={this.onDeleteIngredient}
                />
                {
                    selectedIngredients.map( ( selected, i ) => (
                        <div key={selected._id}>
                            <h2>{`Amount of ${ selected.label }`}</h2>
                            { Number.isNaN( Number( ingredients[ i ].amount ) )
                                && <p className="warning">Not a valid number!</p>
                            }
                            <input
                                value={ingredients[ i ].amount}
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
