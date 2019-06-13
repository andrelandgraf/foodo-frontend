import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import DataListInput from 'react-datalist-input';

class LifestylesContainer extends React.Component {
    constructor( props ) {
        super( props );

        const { user } = this.props;
        const { lifestyle } = user;
        let userLifestyle = lodash.cloneDeep( lifestyle );
        // TODO remove this test if we have set lifestyle in user to required in props
        if ( !lifestyle ) userLifestyle = {};

        this.state = {
            lifestyles: undefined,
            // eslint-disable-next-line react/no-unused-state
            lifestyle: userLifestyle,
        };
    }

    componentWillMount = async () => {
        const { lifestyles } = this.state;
        if ( !lifestyles ) {
            // TODO get lifestyles from backend via FoodItemsService
            this.setState( {
                // mockup data
                lifestyles: [
                    {
                        name: 'Lion',
                        id: 1,
                    },
                    {
                        name: 'Vegetarian',
                        id: 2,
                    },
                    {
                        name: 'Vegan',
                        id: 3,
                    },
                ],
            } );
        }
    }

    onSelect = ( item ) => {
        const { lifestyle } = this.state;
        if ( item.id === lifestyle.id ) return;
        const newLifestyle = lodash.cloneDeep( item );
        // TODO update backend
        this.setState( { lifestyle: newLifestyle } );
    }

    removeAlreadySelectedItems = ( lifestyle, lifestyles ) => lifestyles
        .filter( item => !( item.id === lifestyle.id ) );

    mapGoalToDataListInput = lifestyles => lifestyles
        .map( item => ( {
            ...item,
            key: item.id,
            label: item.name,
        } ) );

    render() {
        const { lifestyle, lifestyles } = this.state;
        const clonedLifestyles = lodash.cloneDeep( lifestyles );
        let possibleMatches = this.removeAlreadySelectedItems( lifestyle, clonedLifestyles );
        possibleMatches = this.mapGoalToDataListInput( possibleMatches );

        return (
            <div className="dislikes-container">
                <h2>Your Personal lifestyle</h2>
                <div className="input-container">
                    <DataListInput
                        items={possibleMatches}
                        placeholder="Select your lifestyle..."
                        onSelect={this.onSelect}
                        clearInputOnSelect={false}
                        suppressReselect={false}
                    />
                </div>
            </div>
        );
    }
}

LifestylesContainer.propTypes = {
    user: PropTypes.shape( {
        // TODO make lifestyle required when we have the backend logic for it
        lifestyle: PropTypes.array,
    } ).isRequired,
};

export default LifestylesContainer;
