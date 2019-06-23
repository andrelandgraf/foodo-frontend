import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { postGoal } from '../../services/foodo-api/user/profileService';

import { KEYS } from '../../utilities/internationalization/internationalization';
import { UserStateContext } from '../../provider/UserStateProvider';

class GoalsContainer extends React.Component {
    updateUser = ( newGoal ) => {
        const { user, setUser } = this.context;
        const updatedUser = lodash.cloneDeep( user );
        updatedUser.goal = newGoal;
        setUser( updatedUser );
    }

    onSelect = ( item ) => {
        const { user } = this.context;
        const { goal } = user;
        if ( goal && goal._id === item._id ) return;

        const newGoal = lodash.cloneDeep( item );
        postGoal( { name: newGoal.name, _id: newGoal._id } );
        this.updateUser( newGoal );
    }

    mapGoalsToKeyLabelPairs = goals => goals
        .map( item => ( {
            ...item,
            key: item._id,
            label: item.name,
        } ) );

    render() {
        const { user } = this.context;
        const { goals } = this.props;

        const goal = user.goal ? lodash.cloneDeep( user.goal ) : {};
        const clonedGoals = lodash.cloneDeep( goals );

        const possibleMatches = this.mapGoalsToKeyLabelPairs( clonedGoals );

        return (
            <div className="dislikes-container">
                <h2>{i18n.t( KEYS.HEADERS.GOALS_SELECTION )}</h2>
                <div className="input-container">
                    <DataListInput
                        items={possibleMatches}
                        placeholder={i18n.t( KEYS.LABELS.GOALS_PLACEHOLDER )}
                        onSelect={this.onSelect}
                        clearInputOnSelect={false}
                        suppressReselect={false}
                        inputClassName="datalist-input-input"
                        dropdownClassName="datalist-input-dropdown"
                        itemClassName="datalist-input-item"
                        activeItemClassName="datalist-input-activeItem"
                        initialValue={goal.name || ''}
                    />
                </div>
            </div>
        );
    }
}

GoalsContainer.contextType = UserStateContext;

GoalsContainer.propTypes = {
    goals: PropTypes.arrayOf(
        PropTypes.shape( {
            name: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        } ),
    ).isRequired,
};

export default GoalsContainer;
