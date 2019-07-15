import React, {
    useState, useContext, useMemo, useEffect,
} from 'react';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';

import { postRequest } from '../../services/foodo-api/httpService';
import { ENDPOINTS } from '../../services/foodo-api/api';
import Button from '../../components/button/button';
import useDisplayableIngredients from '../../hooks/useDisplayableIngredients';
import Tags from '../../components/tags/tags';
import { GoalsLifestylesContext } from '../../provider/GoalsLifestylesProvider';

/**
 * Add Allergies to each ingredient
 */
function SetLifestylesContainer() {
    const [ pickedIngredient, setPickedI ] = useState();
    const [ pickedLifestyles, setPickedL ] = useState( [] );
    const { lifestyles } = useContext( GoalsLifestylesContext );
    const displayableIngredients = useDisplayableIngredients();

    const displayableLifestyles = useMemo( () => (
        lifestyles.map( l => ( {
            ...l,
            key: l._id,
            label: l.name,
        } ) )
    ), [ lifestyles ] );

    useEffect( () => {
        if ( displayableLifestyles && displayableLifestyles.length && pickedIngredient ) {
            setPickedL( lodash.cloneDeep( displayableLifestyles
                .filter( l => pickedIngredient.notForLifestyles
                    .find( nl => nl === l._id ) ) ) );
        }
    }, [ pickedIngredient, displayableLifestyles ] );

    const onClickSave = () => {
        const pickedLIds = pickedLifestyles.map( lifestyle => lifestyle._id );
        const data = { _id: pickedIngredient._id, notForLifestyles: pickedLIds };
        postRequest( `${ ENDPOINTS.INGREDIENTS }/setlifestyles`, data );
        setPickedL( [] );
        setPickedI( undefined );
    };

    const onDeleteA = ( id ) => {
        const updatedLifestyles = lodash
            .cloneDeep( pickedLifestyles )
            .filter( l => l._id !== id );
        setPickedL( updatedLifestyles );
    };

    const addPickedA = ( l ) => {
        const updatedLifestyles = lodash
            .cloneDeep( pickedLifestyles );
        updatedLifestyles.push( l );
        setPickedL( updatedLifestyles );
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
                <h2>Select NOT for this lifestyle</h2>
                <div className="input-container">
                    <Tags onDelete={id => onDeleteA( id )} tags={pickedLifestyles} />
                    <DataListInput
                        items={displayableLifestyles}
                        placeholder="choose a Lifestyle"
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

export default SetLifestylesContainer;
