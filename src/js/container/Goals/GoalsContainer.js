import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { postGoal, getGoals } from '../../services/foodo-api/user/profileService';

import { KEYS } from '../../utilities/internationalization/internationalization';

class GoalsContainer extends React.Component {
    constructor( props ) {
        super( props );

        const { user } = this.props;
        const { goal } = user;
        const userGoal = goal ? lodash.cloneDeep( goal ) : {};

        this.state = {
            goals: [],
            goal: userGoal,
        };
    }

    componentWillMount = () => {
        getGoals().then( goals => this.setState( { goals } ) );
    }

    onSelect = ( item ) => {
        const { goal } = this.state;
        if ( item._id === goal._id ) return;

        const newGoal = lodash.cloneDeep( item );
        this.setState( { goal: newGoal } );

        postGoal( { name: newGoal.name, _id: newGoal._id } );
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

GoalsContainer.propTypes = {
    user: PropTypes.shape( {
        goal: PropTypes.shape( {
            name: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        } ),
    } ).isRequired,
};

export default GoalsContainer;
