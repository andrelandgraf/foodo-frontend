import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { getAllergies, putAllergy } from '../../services/foodo-api/user/profileService';

import Tags from '../../components/tags/tags';

class AllergiesContainer extends React.Component {
    constructor( props ) {
        super( props );

        const { user } = this.props;
        const { allergies } = user;
        let userAllergies = lodash.cloneDeep( allergies );
        if ( !allergies ) userAllergies = [];

        this.state = {
            possibleAllergies: [],
            allergies: userAllergies,
        };
    }

    componentWillMount = async () => {
        getAllergies( possibleAllergies => this.setState( { possibleAllergies } ) );
    }

    onSelect = ( item ) => {
        const { allergies } = this.state;
        if ( allergies.find( allergy => allergy._id === item._id ) ) return;

        const updatedAllergies = lodash.cloneDeep( allergies );
        updatedAllergies.push( item );
        this.setState( { allergies: updatedAllergies } );

        putAllergy( { name: updatedAllergies.name, _id: updatedAllergies._id } );
    }

    onDelete = ( itemId ) => {
        const { allergies } = this.state;

        let updatedAllergies = lodash.cloneDeep( allergies );
        updatedAllergies = updatedAllergies.filter( allergy => allergy._id !== itemId );
        this.setState( { allergies: updatedAllergies } );
    }

    removeAlreadySelectedItems = ( allergies, possibleAllergies ) => possibleAllergies
        .filter( item => !( allergies.find( allergy => allergy._id === item._id ) ) );

    mapIngridientsForDataListInput = possibleAllergies => possibleAllergies
        .map( item => ( {
            ...item,
            key: item._id,
            label: item.name,
        } ) );

    render() {
        const { allergies, possibleAllergies } = this.state;
        const clonedPossibleAllergies = lodash.cloneDeep( possibleAllergies );
        let possibleMatches = this.removeAlreadySelectedItems( allergies, clonedPossibleAllergies );
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
        allergies: PropTypes.arrayOf(
            PropTypes.shape( {
                name: PropTypes.string.isRequired,
                _id: PropTypes.string.isRequired,
            } ),
        ),
    } ).isRequired,
};

export default AllergiesContainer;
