import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS, getLocale } from '../../utilities/internationalization/internationalization';

import { getIngredients } from '../../services/foodo-api/ingredient/ingredientsService';
import { putDislike } from '../../services/foodo-api/user/profileService';

import Tags from '../../components/tags/tags';

class DislikesContainer extends React.Component {
    constructor( props ) {
        super( props );

        const { user } = this.props;
        const { dislikes } = user;
        let userDislikes = lodash.cloneDeep( dislikes );
        if ( !dislikes ) userDislikes = [];

        this.state = {
            foodItems: [],
            dislikes: userDislikes,
        };
    }

    componentWillMount = async () => {
        getIngredients().then( ingredients => this.setState( { foodItems: ingredients } ) );
    }

    onSelect = ( item ) => {
        const { dislikes } = this.state;
        if ( dislikes.find( dislike => dislike._id === item._id ) ) return;

        const updatedDislikes = lodash.cloneDeep( dislikes );
        updatedDislikes.push( item );
        this.setState( { dislikes: updatedDislikes } );

        putDislike( { name: item.name, _id: item._id } );
    }

    onDelete = ( itemId ) => {
        const { dislikes } = this.state;

        let updatedDislikes = lodash.cloneDeep( dislikes );
        updatedDislikes = updatedDislikes.filter( dislike => dislike._id !== itemId );
        this.setState( { dislikes: updatedDislikes } );
    }

    removeAlreadySelectedItems = ( dislikes, foodItems ) => foodItems
        .filter( item => !( dislikes.find( dislike => dislike._id === item._id ) ) );

    mapFoodItemsForDataListInput = foodItems => foodItems
        .map( item => ( {
            ...item,
            key: item._id,
            label: item.name[ getLocale() ],
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
                        dropDownLength={10}
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
        dislikes: PropTypes.arrayOf(
            PropTypes.shape( {
                name: PropTypes.string.isRequired,
                _id: PropTypes.string.isRequired,
            } ),
        ),
    } ).isRequired,
};

export default DislikesContainer;
