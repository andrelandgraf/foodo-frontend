import React, { useContext, useMemo } from 'react';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';

import { putAllergy, deleteAllergy } from '../../../services/foodo-api/user/profileService';

import { UserStateContext } from '../../../provider/UserStateProvider';
import { AllergiesContext } from '../../../provider/AllergiesProvider';

import Tags from '../../../components/tags/tags';

function AllergiesContainer() {
    const { user, setUser } = useContext( UserStateContext );
    const { allergies } = useContext( AllergiesContext );

    const updateUser = ( updatedAllergies ) => {
        const updatedUser = lodash.cloneDeep( user );
        updatedUser.allergies = updatedAllergies;
        setUser( updatedUser );
    };

    const onSelect = ( item ) => {
        if ( user.allergies.find( allergy => allergy._id === item._id ) ) return;

        putAllergy( { name: item.name, _id: item._id } );

        const updatedAllergies = lodash.cloneDeep( user.allergies );
        updatedAllergies.push( item );

        updateUser( updatedAllergies );
    };

    const onDelete = ( itemId ) => {
        if ( !user.allergies.find( allergy => allergy._id === itemId ) ) return;

        deleteAllergy( { _id: itemId } );

        let updatedAllergies = lodash.cloneDeep( user.allergies );
        updatedAllergies = updatedAllergies.filter( allergy => allergy._id !== itemId );

        updateUser( updatedAllergies );
    };

    const possibleMatches = useMemo( () => lodash.cloneDeep( allergies )
        .filter( allergy => !( user.allergies.find( selected => selected._id === allergy._id ) ) )
        .map( allergy => ( {
            ...allergy,
            key: allergy._id,
            label: allergy.name,
        } ) ),
    [ user, allergies ] );

    const selectedAllergies = useMemo( () => lodash.cloneDeep( user.allergies )
        .map( allergy => ( {
            ...allergy,
            key: allergy._id,
            label: allergy.name,
        } ) ),
    [ user, allergies ] );


    return (
        <div className="selection-container">
            <h2>{i18n.t( KEYS.HEADERS.ALLERGIES_SELECTION )}</h2>
            {
                <Tags tags={selectedAllergies} onDelete={onDelete} showNoneTag />
            }
            <div className="input-container">
                <DataListInput
                    items={possibleMatches}
                    placeholder={i18n.t( KEYS.LABELS.ALLERGIES_PLACEHOLDER )}
                    onSelect={onSelect}
                    inputClassName="datalist-input-input"
                    dropdownClassName="datalist-input-dropdown"
                    itemClassName="datalist-input-item"
                    activeItemClassName="datalist-input-activeItem"
                    suppressReselect={false}
                    clearInputOnSelect
                />
            </div>
        </div>
    );
}

export default AllergiesContainer;
