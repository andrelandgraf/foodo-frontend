import React, {
    useState, useEffect, useContext, useMemo,
} from 'react';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS, getLocale } from '../../utilities/internationalization/internationalization';

import { putDislike, deleteDislike } from '../../services/foodo-api/user/profileService';

import { UserStateContext } from '../../provider/UserStateProvider';
import useDisplayableIngredients, { mapIngredientsDisplayable } from '../../hooks/useDisplayableIngredients';

import Tags from '../../components/tags/tags';

function DislikesContainer() {
    const [ dislikes, setDislikes ] = useState( [] );
    const { user, setUser } = useContext( UserStateContext );
    const displayableIngredients = useDisplayableIngredients();

    useEffect( () => {
        const { dislikes: uDislikes } = user;
        setDislikes( lodash.cloneDeep( uDislikes ) );
    }, [] );

    const updateUser = ( updatedDislikes ) => {
        const updatedUser = lodash.cloneDeep( user );
        updatedUser.dislikes = updatedDislikes;
        setUser( updatedUser );
    };

    const onSelect = ( dislike ) => {
        if ( dislikes.find( d => d._id === dislike._id ) ) return;

        const updatedDislikes = lodash.cloneDeep( dislikes );
        updatedDislikes.push( dislike );

        setDislikes( updatedDislikes );
        putDislike( { name: dislike.name, _id: dislike._id } );
        updateUser( updatedDislikes );
    };

    const onDelete = ( id ) => {
        let updatedDislikes = lodash.cloneDeep( dislikes );
        updatedDislikes = updatedDislikes.filter( dislike => dislike._id !== id );

        setDislikes( updatedDislikes );
        deleteDislike( { _id: id } );
        updateUser( updatedDislikes );
    };

    const possibleMatches = useMemo( () => ( displayableIngredients
        .filter( i => !( dislikes.find( dislike => dislike._id === i._id ) ) )
    ), [ dislikes, displayableIngredients ] );

    const displayableDislikes = useMemo( () => mapIngredientsDisplayable( dislikes, getLocale() ),
        [ dislikes ] );

    return (
        <div className="dislikes-container">
            <h2>{i18n.t( KEYS.HEADERS.DISLIKES_SELECTION )}</h2>
            {
                <Tags tags={displayableDislikes} onDelete={onDelete} showNoneTag />
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
