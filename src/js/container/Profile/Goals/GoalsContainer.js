import React, { useContext, useMemo } from 'react';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';

import { postGoal } from '../../../services/foodo-api/user/profileService';

import { UserStateContext } from '../../../provider/UserStateProvider';
import { GoalsLifestylesContext } from '../../../provider/GoalsLifestylesProvider';

function GoalsContainer() {
    const { user, setUser } = useContext( UserStateContext );
    const { goals } = useContext( GoalsLifestylesContext );

    const possibleMatches = useMemo( () => lodash.cloneDeep( goals )
        .map( item => ( {
            ...item,
            key: item._id,
            label: item.name,
        } ) ), [ user, goals ] );

    const updateUser = ( newGoal ) => {
        const updatedUser = lodash.cloneDeep( user );
        updatedUser.goal = newGoal;
        setUser( updatedUser );
    };

    const onSelect = ( item ) => {
        const { goal } = user;
        if ( goal && goal._id === item._id ) return;

        const newGoal = lodash.cloneDeep( goal );
        postGoal( { name: newGoal.name, _id: newGoal._id } );
        updateUser( newGoal );
    };

    return (
        <div className="selection-container">
            <h2>{i18n.t( KEYS.HEADERS.GOALS_SELECTION )}</h2>
            <div className="input-container">
                <DataListInput
                    items={possibleMatches}
                    placeholder={i18n.t( KEYS.LABELS.GOALS_PLACEHOLDER )}
                    onSelect={onSelect}
                    clearInputOnSelect={false}
                    suppressReselect={false}
                    inputClassName="datalist-input-input"
                    dropdownClassName="datalist-input-dropdown"
                    itemClassName="datalist-input-item"
                    activeItemClassName="datalist-input-activeItem"
                    initialValue={user.goal ? user.goal.name : ''}
                />
            </div>
        </div>
    );
}

export default GoalsContainer;
