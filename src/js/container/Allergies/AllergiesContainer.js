import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import DataListInput from 'react-datalist-input';
import Tags from '../../components/tags/tags';

class AllergiesContainer extends React.Component {
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
            // TODO get foodItems from backend via FoodItemsService
            this.setState( {
                // mockup data
                foodItems: [
                    {
                        name: 'gluten',
                        id: 1,
                    },
                    {
                        name: 'lactose',
                        id: 2,
                    },
                    {
                        name: 'nuts',
                        id: 3,
                    },
                ],
            } );
        }
    }

    onSelect = ( item ) => {
        const { dislikes } = this.state;
        const updatedDislikes = lodash.cloneDeep( dislikes );
        updatedDislikes.push( item );
        // TODO update backend
        this.setState( { dislikes: updatedDislikes } );
    }

    onDelete = ( itemId ) => {
        const { dislikes } = this.state;
        let updatedDislikes = lodash.cloneDeep( dislikes );
        updatedDislikes = updatedDislikes.filter( dislike => dislike.id !== itemId );
        // TODO update backend
        this.setState( { dislikes: updatedDislikes } );
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
            <div className="dislikes-container">
                <h2>Your Allergies</h2>
                {
                    dislikes.length > 0
                    && <Tags tags={dislikes} onDelete={this.onDelete} />
                }
                <div className="input-container">
                    <DataListInput
                        items={possibleMatches}
                        placeholder="Select your allergies..."
                        onSelect={this.onSelect}
                        suppressReselect={false}
                        clearInputOnSelect
                    />
                </div>
            </div>
        );
    }
}

AllergiesContainer.propTypes = {
    user: PropTypes.shape( {
        // TODO make dislikes required when we have the backend logic for it
        dislikes: PropTypes.array,
    } ).isRequired,
};

export default AllergiesContainer;
