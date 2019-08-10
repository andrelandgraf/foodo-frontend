import React, { useContext, useMemo } from 'react';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { postLifestyle } from '../../../services/foodo-api/user/profileService';

import { KEYS } from '../../../utilities/internationalization/internationalization';

import { UserStateContext } from '../../../provider/UserStateProvider';
import { GoalsLifestylesContext } from '../../../provider/GoalsLifestylesProvider';

function LifestylesContainer() {
    const { user, setUser } = useContext( UserStateContext );
    const { lifestyles } = useContext( GoalsLifestylesContext );

    const possibleMatches = useMemo( () => lifestyles
        .map( item => ( {
            ...item,
            key: item._id,
            label: item.name,
        } ) ), [ lifestyles ] );

    const updateUser = ( newLifestyle ) => {
        const updatedUser = lodash.cloneDeep( user );
        updatedUser.lifestyle = newLifestyle;
        setUser( updatedUser );
    };

    const onSelect = ( item ) => {
        const { lifestyle } = user;
        if ( lifestyle && lifestyle._id === item._id ) return;

        const newLifestyle = lodash.cloneDeep( item );
        postLifestyle( { name: newLifestyle.name, _id: newLifestyle._id } );
        updateUser( newLifestyle );
    };

    return (
        <div className="selection-container">
            <h2>{i18n.t( KEYS.HEADERS.LIFESTYLES_SELECTION )}</h2>
            <div className="input-container">
                <DataListInput
                    items={possibleMatches}
                    placeholder={i18n.t( KEYS.LABELS.LIFESTYLES_PLACEHOLDER )}
                    onSelect={onSelect}
                    clearInputOnSelect={false}
                    suppressReselect={false}
                    inputClassName="datalist-input-input"
                    dropdownClassName="datalist-input-dropdown"
                    itemClassName="datalist-input-item"
                    activeItemClassName="datalist-input-activeItem"
                    initialValue={user.lifestyle ? user.lifestyle.name : ''}
                />
            </div>
        </div>
    );
}

export default LifestylesContainer;
