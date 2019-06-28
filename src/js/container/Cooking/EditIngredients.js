import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';

import { updateUserRecipe } from '../../services/foodo-api/recipe/recipesService';

import { IngredientsContext } from '../../provider/IngredientsProvider';
import { UserRecipeContext } from '../../provider/UserRecipeProvider';
import { getLocale } from '../../utilities/internationalization/internationalization';

import Modal from '../../components/modal/modal';
import Ingredient from '../../components/ingredient/ingredient';

function EditIngredients( { onCloseEditIngredients } ) {
    const { ingredients } = useContext( IngredientsContext );
    const { userRecipe, setUserRecipe } = useContext( UserRecipeContext );

    const onSelect = ( ingredient ) => {
        const updatedRecipe = lodash.cloneDeep( userRecipe );
        updatedRecipe.personalizedRecipe.ingredients.push( {
            amount: 1,
            ingredient: ingredient._id,
        } );
        updateUserRecipe( updatedRecipe ).then( ( postedRecipe ) => {
            setUserRecipe( postedRecipe );
        } );
    };

    const onDelete = ( ingredient ) => {
        const updatedRecipe = lodash.cloneDeep( userRecipe );
        updatedRecipe.personalizedRecipe.ingredients = updatedRecipe.personalizedRecipe
            .ingredients.filter( i => i.ingredient._id !== ingredient._id );
        updateUserRecipe( updatedRecipe ).then( postedRecipe => setUserRecipe( postedRecipe ) );
    };

    const makeIngredientsDisplayable = iArray => iArray
        .map( ingredient => ( {
            ...ingredient,
            label: ingredient.name[ getLocale() ],
            key: ingredient._id,
        } ) );

    const makeRecipeIngredientsDisplayable = iArray => iArray
        .map( ingredient => ( {
            ...ingredient.ingredient,
            amount: ingredient.amount,
            label: ingredient.ingredient.name[ getLocale() ],
            key: ingredient.ingredient._id,
        } ) );

    const displayableIngredients = useMemo( () => makeIngredientsDisplayable(
        lodash.cloneDeep( ingredients ),
    ).filter( i => !userRecipe.personalizedRecipe.ingredients
        .find( alreadyI => alreadyI._id === i._id ) ), [ ingredients, userRecipe ] );

    const displayableUserRecipe = useMemo( () => {
        const displayable = userRecipe
            ? lodash.cloneDeep( userRecipe )
            : undefined;
        if ( displayable ) {
            displayable.personalizedRecipe.ingredients = makeRecipeIngredientsDisplayable(
                displayable.personalizedRecipe.ingredients,
            );
        }
        return displayable;
    }, [ userRecipe ] );

    const renderModalTitle = () => (
        <h2>
            Personalise your recipe.
        </h2>
    );

    return (
        <Modal
            classes="ingredients-container edit-ingredients-container"
            onCloseModal={onCloseEditIngredients}
            Title={renderModalTitle()}
        >
            <div className="input-container">
                <DataListInput
                    items={displayableIngredients}
                    placeholder="Select additional ingredients..."
                    onSelect={onSelect}
                    dropDownLength={10}
                    requiredInputLength={1}
                    inputClassName="datalist-input-input"
                    dropdownClassName="datalist-input-dropdown"
                    itemClassName="datalist-input-item"
                    activeItemClassName="datalist-input-activeItem"
                    suppressReselect={false}
                    clearInputOnSelect
                />
            </div>
            { displayableUserRecipe.personalizedRecipe.ingredients.map(
                ingredient => (
                    <Ingredient key={ingredient.key} ingredient={ingredient} onClose={onDelete} />
                ),
            ) }
        </Modal>
    );
}

EditIngredients.propTypes = {
    onCloseEditIngredients: PropTypes.func.isRequired,
};

export default EditIngredients;
