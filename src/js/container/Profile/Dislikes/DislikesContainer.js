import React, { useContext, useMemo } from 'react';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS, getLocale } from '../../../utilities/internationalization/internationalization';

import { putDislike, deleteDislike } from '../../../services/foodo-api/user/profileService';

import { UserStateContext } from '../../../provider/UserStateProvider';
import useDisplayableIngredients, { mapIngredientsDisplayable } from '../../../hooks/useDisplayableIngredients';

import Tags from '../../../components/tags/tags';

function DislikesContainer() {
    const { user, setUser } = useContext( UserStateContext );
    const displayableIngredients = useDisplayableIngredients();

    const updateUser = ( updatedDislikes ) => {
        const updatedUser = lodash.cloneDeep( user );
        updatedUser.dislikes = updatedDislikes;
        setUser( updatedUser );
    };

    const onSelect = ( dislike ) => {
        if ( user.dislikes.find( d => d._id === dislike._id ) ) return;

        const updatedDislikes = lodash.cloneDeep( user.dislikes );
        updatedDislikes.push( dislike );

        putDislike( { name: dislike.name, _id: dislike._id } );

        updateUser( updatedDislikes );
    };

    const onDelete = ( id ) => {
        if ( !user.dislikes.find( d => d._id === id ) ) return;

        let updatedDislikes = lodash.cloneDeep( user.dislikes );
        updatedDislikes = updatedDislikes.filter( dislike => dislike._id !== id );

        deleteDislike( { _id: id } );

        updateUser( updatedDislikes );
    };

    const possibleMatches = useMemo( () => ( displayableIngredients
        .filter( i => !( user.dislikes.find( dislike => dislike._id === i._id ) ) )
    ), [ user, displayableIngredients ] );

    const selectedDislikes = useMemo( () => mapIngredientsDisplayable( user.dislikes, getLocale() ),
        [ user ] );

    return (
        <div className="selection-container">
            <h2>{i18n.t( KEYS.HEADERS.DISLIKES_SELECTION )}</h2>
            {
                <Tags tags={selectedDislikes} onDelete={onDelete} showNoneTag />
            }
            <div className="input-container">
                <DataListInput
                    items={possibleMatches}
                    placeholder={i18n.t( KEYS.LABELS.DISLIKES_PLACEHOLDER )}
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
        </div>
    );
}

export default DislikesContainer;
