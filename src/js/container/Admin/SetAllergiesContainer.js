import React, { useState, useContext, useMemo } from 'react';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';

import { postRequest } from '../../services/foodo-api/httpService';
import { ENDPOINTS } from '../../services/foodo-api/api';
import Button from '../../components/button/button';
import { AllergiesContext } from '../../provider/AllergiesProvider';
import useDisplayableIngredients from '../../hooks/useDisplayableIngredients';
import Tags from '../../components/tags/tags';

/**
 * Add Allergies to each ingredient
 */
function SetAllergiesContainer() {
    const [ pickedIngredient, setPickedI ] = useState();
    const [ pickedAllergies, setPickedA ] = useState( [] );
    const { allergies } = useContext( AllergiesContext );
    const displayableIngredients = useDisplayableIngredients();

    const displayableAllergies = useMemo( () => (
        allergies.map( a => ( {
            ...a,
            key: a._id,
            label: a.name,
        } ) )
    ), [ allergies ] );

    const onClickSave = () => {
        const pickedAIds = pickedAllergies.map( allergy => allergy._id );
        const data = { _id: pickedIngredient._id, notForAllergy: pickedAIds };
        postRequest( `${ ENDPOINTS.INGREDIENTS }/setallergies`, data );
        setPickedA( [] );
        setPickedI( undefined );
    };

    const onDeleteA = ( id ) => {
        const updatedAllergies = lodash
            .cloneDeep( pickedAllergies )
            .filter( a => a._id !== id );
        setPickedA( updatedAllergies );
    };

    const addPickedA = ( a ) => {
        const updatedAllergies = lodash
            .cloneDeep( pickedAllergies );
        updatedAllergies.push( a );
        setPickedA( updatedAllergies );
    };

    return (
        <div className="container admin-page">
            <div className="center box">
                <h2>Select an Ingredient</h2>
                <div className="input-container">
                    <DataListInput
                        items={displayableIngredients
                            .filter( i => !i.notForAllergy || !i.notForAllergy.length )
                        }
                        placeholder="choose an Ingredient..."
                        onSelect={i => setPickedI( i )}
                        dropDownLength={10}
                        requiredInputLength={1}
                        inputClassName="datalist-input-input"
                        dropdownClassName="datalist-input-dropdown"
                        itemClassName="datalist-input-item"
                        activeItemClassName="datalist-input-activeItem"
                        suppressReselect={false}
                        clearInputOnSelect={false}
                    />
                </div>
                <h2>Pick the Allergies</h2>
                <div className="input-container">
                    <Tags onDelete={id => onDeleteA( id )} tags={pickedAllergies} />
                    <DataListInput
                        items={displayableAllergies}
                        placeholder="choose an Category"
                        onSelect={a => addPickedA( a )}
                        dropDownLength={10}
                        requiredInputLength={0}
                        inputClassName="datalist-input-input"
                        dropdownClassName="datalist-input-dropdown"
                        itemClassName="datalist-input-item"
                        activeItemClassName="datalist-input-activeItem"
                        suppressReselect={false}
                        clearInputOnSelect
                    />
                </div>
                <Button
                    onClick={onClickSave}
                    text="save"
                    disabled={!pickedAllergies.length || !pickedIngredient}
                    primary
                />
            </div>
        </div>
    );
}

export default SetAllergiesContainer;
