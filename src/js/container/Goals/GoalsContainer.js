import React from 'react';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { postGoal, getGoals } from '../../services/foodo-api/user/profileService';

import { KEYS } from '../../utilities/internationalization/internationalization';
import { UserStateContext } from '../../provider/UserStateProvider';

class GoalsContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            goals: [],
            goal: {},
        };
    }

    componentWillMount = () => {
        const { user } = this.context;
        const { goal } = user;
        const userGoal = goal ? lodash.cloneDeep( goal ) : {};

        getGoals().then( goals => this.setState( { goals, goal: userGoal } ) );
    }

    updateUser = ( newGoal ) => {
        const { user, setUser } = this.context;
        const updatedUser = lodash.cloneDeep( user );
        updatedUser.goal = newGoal;
        setUser( updatedUser );
    }

    onSelect = ( item ) => {
        const { goal } = this.state;
        if ( item._id === goal._id ) return;

        const newGoal = lodash.cloneDeep( item );
        this.setState( { goal: newGoal } );

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
        const { goal, goals } = this.state;
        const clonedGoals = lodash.cloneDeep( goals );
        const possibleMatches = this.mapGoalsToKeyLabelPairs( clonedGoals );

        return (
            <div className="dislikes-container">
                <h2>{i18n.t( KEYS.HEADERS.GOALS_SELECTION )}</h2>
                <div className="input-container">
                    <DataListInput
                        items={possibleMatches}
                        placeholder={goal.name || i18n.t( KEYS.LABELS.GOALS_PLACEHOLDER )}
                        onSelect={this.onSelect}
                        clearInputOnSelect={false}
                        suppressReselect={false}
                    />
                </div>
            </div>
        );
    }
}

GoalsContainer.contextType = UserStateContext;

export default GoalsContainer;
