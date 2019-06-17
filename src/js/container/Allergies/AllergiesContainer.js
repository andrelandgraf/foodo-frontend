import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import Tags from '../../components/tags/tags';

class AllergiesContainer extends React.Component {
    constructor( props ) {
        super( props );

        const { user } = this.props;
        const { allergies } = user;
        let userAllergies = lodash.cloneDeep( allergies );
        // TODO remove this test if we have set allergies in user to required in props
        if ( !allergies ) userAllergies = [];

        this.state = {
            ingridients: undefined,
            // eslint-disable-next-line react/no-unused-state
            allergies: userAllergies,
        };
    }

    componentWillMount = async () => {
        const { ingridients } = this.state;
        if ( !ingridients ) {
            // TODO get ingridients from backend via FoodItemsService
            this.setState( {
                // mockup data
                ingridients: [
                    {
                        name: 'gluten',
                        _id: 1,
                    },
                    {
                        name: 'lactose',
                        _id: 2,
                    },
                    {
                        name: 'nuts',
                        _id: 3,
                    },
                ],
            } );
        }
    }

    onSelect = ( item ) => {
        const { allergies } = this.state;
        if ( allergies.find( allergy => allergy._id === item._id ) ) return;
        const updatedAllergies = lodash.cloneDeep( allergies );
        updatedAllergies.push( item );
        // TODO update backend
        this.setState( { allergies: updatedAllergies } );
    }

    onDelete = ( itemId ) => {
        const { allergies } = this.state;
        let updatedAllergies = lodash.cloneDeep( allergies );
        updatedAllergies = updatedAllergies.filter( allergy => allergy._id !== itemId );
        // TODO update backend
        this.setState( { allergies: updatedAllergies } );
    }

    removeAlreadySelectedItems = ( allergies, ingridients ) => ingridients
        .filter( item => !( allergies.find( allergy => allergy._id === item._id ) ) );

    mapIngridientsForDataListInput = ingridients => ingridients
        .map( item => ( {
            ...item,
            key: item._id,
            label: item.name,
        } ) );

    render() {
        const { allergies, ingridients } = this.state;
        const clonedIngridients = lodash.cloneDeep( ingridients );
        let possibleMatches = this.removeAlreadySelectedItems( allergies, clonedIngridients );
        possibleMatches = this.mapIngridientsForDataListInput( possibleMatches );

        return (
            <div className="dislikes-container">
                <h2>{i18n.t( KEYS.HEADERS.ALLERGIES_SELECTION )}</h2>
                {
                    allergies.length > 0
                    && <Tags tags={allergies} onDelete={this.onDelete} />
                }
                <div className="input-container">
                    <DataListInput
                        items={possibleMatches}
                        placeholder={i18n.t( KEYS.LABELS.ALLERGIES_PLACEHOLDER )}
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
        // TODO make allergies required when we have the backend logic for it
        allergies: PropTypes.array,
    } ).isRequired,
};

export default AllergiesContainer;
