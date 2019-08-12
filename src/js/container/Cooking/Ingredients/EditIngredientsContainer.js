import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';

import { updateUserRecipe } from '../../../services/foodo-api/recipe/recipesService';
import { unitToLabel } from '../../../utilities/units';

import { UserRecipeContext } from '../../../provider/UserRecipeProvider';
import { getLocale } from '../../../utilities/internationalization/internationalization';

import Modal from '../../../components/modal/modal';
import Amount from '../../../components/amount/amount';
import Ingredient from '../../../components/ingredient/ingredient';
import SubmitButton from '../../../components/button/submitButton';
import useDisplayableIngredients from '../../../hooks/useDisplayableIngredients';

/**
 * Modal dialogue for editing ingredients ( add, delete )
 * @param onCloseEditIngredients function
 */
function EditIngredients( { onCloseEditIngredients } ) {
    const [ amount, setAmount ] = useState( '' );
    const [ selected, setSelected ] = useState();
    const displayableIngredients = useDisplayableIngredients();

    const { userRecipe, setUserRecipe } = useContext( UserRecipeContext );

    const onSelect = i => setSelected( i );
    const onChangeAmount = e => setAmount( e.target.value );

    const onSave = ( e ) => {
        e.preventDefault();
        const updatedRecipe = lodash.cloneDeep( userRecipe );
        updatedRecipe.personalizedRecipe.ingredients.push( {
            amount: Number( amount ) / selected.unit.amount,
            ingredient: selected._id,
        } );
        updateUserRecipe( updatedRecipe ).then( ( postedRecipe ) => {
            setUserRecipe( postedRecipe );
        } );
        setAmount( '' );
        setSelected( undefined );
    };

    const onDelete = ( ingredient ) => {
        const updatedRecipe = lodash.cloneDeep( userRecipe );
        updatedRecipe.personalizedRecipe.ingredients = updatedRecipe.personalizedRecipe
            .ingredients.filter( i => i.ingredient._id !== ingredient._id );
        setUserRecipe( updatedRecipe );
        updateUserRecipe( updatedRecipe );
    };

    const makeRecipeIngredientsDisplayable = iArray => iArray
        .map( ingredient => ( {
            ...ingredient.ingredient,
            amount: ingredient.amount,
            label: ingredient.ingredient.name[ getLocale() ],
            key: ingredient.ingredient._id,
        } ) );

    const possibleIngredients = useMemo( () => displayableIngredients
        .filter( i => !userRecipe.personalizedRecipe.ingredients
            .find( alreadyI => alreadyI.ingredient._id === i._id ) ),
    [ displayableIngredients, userRecipe ] );

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
            classes="edit-ingredients-container"
            onCloseModal={onCloseEditIngredients}
            Title={renderModalTitle()}
        >

            <form onSubmit={onSave}>
                <div className="edit-ingredients-container-form">
                    <Amount
                        value={amount}
                        unit={selected ? unitToLabel( selected.unit.name ) : 'g'}
                        onChange={onChangeAmount}
                        classes="edit-ingredients-container-form-amount"
                    />
                    <DataListInput
                        items={possibleIngredients}
                        placeholder="Select additional ingredients..."
                        initialValue={selected ? selected.label : ''}
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
                    <SubmitButton label="Add" disabled={!amount || !selected} />
                </div>
            </form>
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
