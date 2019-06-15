import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import Tags from '../../components/tags/tags';

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
            // TODO get foodItems from backend via FoodItemsService
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
                        id: 9,
                    },
                ],
            } );
        }
    }

    onSelect = ( item ) => {
        const { dislikes } = this.state;
        if ( dislikes.find( dislike => dislike.id === item.id ) ) return;
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
                <h2>{i18n.t( KEYS.HEADERS.DISLIKES_SELECTION )}</h2>
                {
                    dislikes.length > 0
                    && <Tags tags={dislikes} onDelete={this.onDelete} />
                }
                <div className="input-container">
                    <DataListInput
                        items={possibleMatches}
                        placeholder={i18n.t( KEYS.LABELS.DISLIKES_PLACEHOLDER )}
                        onSelect={this.onSelect}
                        suppressReselect={false}
                        clearInputOnSelect
                    />
                </div>
            </div>
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
