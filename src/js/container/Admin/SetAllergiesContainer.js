import React, {
    useState, useContext, useMemo, useEffect,
} from 'react';
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

    useEffect( () => {
        if ( displayableAllergies && displayableAllergies.length && pickedIngredient ) {
            setPickedA( lodash.cloneDeep( displayableAllergies
                .filter( a => pickedIngredient.notForAllergies
                    .find( na => na === a._id ) ) ) );
        }
    }, [ pickedIngredient, displayableAllergies ] );

    const onClickSave = () => {
        const pickedAIds = pickedAllergies.map( allergy => allergy._id );
        const data = { _id: pickedIngredient._id, notForAllergies: pickedAIds };
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
                        items={displayableIngredients}
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
                        placeholder="choose an Allergy"
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
                    label="save"
                    disabled={!pickedIngredient}
                    primary
                />
            </div>
        </div>
    );
}

export default SetAllergiesContainer;
