import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import DataListInput from 'react-datalist-input';

class GoalsContainer extends React.Component {
    constructor( props ) {
        super( props );

        const { user } = this.props;
        const { goal } = user;
        let userGoal = lodash.cloneDeep( goal );
        // TODO remove this test if we have set goal in user to required in props
        if ( !goal ) userGoal = {};

        this.state = {
            goals: undefined,
            // eslint-disable-next-line react/no-unused-state
            goal: userGoal,
        };
    }

    componentWillMount = async () => {
        const { goals } = this.state;
        if ( !goals ) {
            // TODO get goals from backend via FoodItemsService
            this.setState( {
                // mockup data
                goals: [
                    {
                        name: 'I want to eath healthy!',
                        id: 1,
                    },
                    {
                        name: 'I want to reduce body weight!',
                        id: 2,
                    },
                ],
            } );
        }
    }

    onSelect = ( item ) => {
        const { goal } = this.state;
        if ( item.id === goal.id ) return;
        const newGoal = lodash.cloneDeep( item );
        // TODO update backend
        this.setState( { goal: newGoal } );
    }

    mapGoalToDataListInput = goals => goals
        .map( item => ( {
            ...item,
            key: item.id,
            label: item.name,
        } ) );

    render() {
        const { goal, goals } = this.state;
        const clonedGoals = lodash.cloneDeep( goals );
        const possibleMatches = this.mapGoalToDataListInput( clonedGoals );

        return (
            <div className="dislikes-container">
                <h2>Your Personal Goal</h2>
                <div className="input-container">
                    <DataListInput
                        items={possibleMatches}
                        placeholder={goal.name || 'Select your goal...'}
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
        // TODO make goal required when we have the backend logic for it
        goal: PropTypes.array,
    } ).isRequired,
};

export default GoalsContainer;
