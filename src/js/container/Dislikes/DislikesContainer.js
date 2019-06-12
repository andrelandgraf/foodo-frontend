import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import DataListInputContainer from '../DataListInput/DataListInputContainer';

class DislikesContainer extends React.Component {
    constructor( props ) {
        super( props );

        const { user } = this.props;
        const { dislikes } = user;
        let userDislikes = lodash.cloneDeep( dislikes );
        // TODO remove this test if we have set dislikes in user to required in props
        if ( !dislikes ) userDislikes = [];

        this.state = {
            foodItems: undefined,
            // eslint-disable-next-line react/no-unused-state
            dislikes: userDislikes,
        };
    }

    componentWillMount = async () => {
        const { foodItems } = this.state;
        if ( !foodItems ) {
            // TODO lead foodItems from backend via FoodItemsService
            this.setState( {
                // mockup data
                foodItems: [
                    {
                        name: 'onion',
                        id: 1,
                    },
                    {
                        name: 'orange',
                        id: 2,
                    },
                    {
                        name: 'apple',
                        id: 3,
                    },
                    {
                        name: 'blue berries',
                        id: 4,
                    },
                    {
                        name: 'avocado',
                        id: 5,
                    },
                    {
                        name: 'beer',
                        id: 6,
                    },
                    {
                        name: 'beens',
                        id: 7,
                    },
                    {
                        name: 'banana',
                        id: 8,
                    },
                    {
                        name: 'berries',
                        id: 1,
                    },
                ],
            } );
        }
    }

    onSelect = ( item ) => {
        console.log( item );
    }

    removeAlreadySelectedItems = ( dislikes, foodItems ) => foodItems
        .filter( item => !( dislikes.find( dislike => dislike.id === item.id ) ) );

    mapFoodItemsForDataListInput = foodItems => foodItems
        .map( item => ( {
            ...item,
            key: item.id,
            label: item.name,
        } ) );

    render() {
        const { dislikes, foodItems } = this.state;

        const clonedFoodItems = lodash.cloneDeep( foodItems );
        let possibleMatches = this.removeAlreadySelectedItems( dislikes, clonedFoodItems );
        possibleMatches = this.mapFoodItemsForDataListInput( possibleMatches );

        return (
            <DataListInputContainer
                items={possibleMatches}
                placeholder="Select your dislikes..."
                onSelect={this.onSelect}
            />
        );
    }
}

DislikesContainer.propTypes = {
    user: PropTypes.shape( {
        // TODO make dislikes required when we have the backend logic for it
        dislikes: PropTypes.array,
    } ).isRequired,
};

export default DislikesContainer;
