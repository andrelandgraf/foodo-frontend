import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { putAllergy, deleteAllergy } from '../../services/foodo-api/user/profileService';

import { UserStateContext } from '../../provider/UserStateProvider';
import Tags from '../../components/tags/tags';

class AllergiesContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            allergies: [],
        };
    }

    componentDidMount = async () => {
        const { user } = this.context;
        const { allergies } = user;
        const userAllergies = lodash.cloneDeep( allergies );
        this.setState( { allergies: userAllergies } );
    }

    updateUser = ( updatedAllergies ) => {
        const { user, setUser } = this.context;
        const updatedUser = lodash.cloneDeep( user );
        updatedUser.allergies = updatedAllergies;
        setUser( updatedUser );
    }

    onSelect = ( item ) => {
        const { allergies } = this.state;
        if ( allergies.find( allergy => allergy._id === item._id ) ) return;

        putAllergy( { name: item.name, _id: item._id } );

        const updatedAllergies = lodash.cloneDeep( allergies );
        updatedAllergies.push( item );
        this.setState( { allergies: updatedAllergies } );

        this.updateUser( updatedAllergies );
    }

    onDelete = ( itemId ) => {
        const { allergies } = this.state;

        deleteAllergy( { _id: itemId } );

        let updatedAllergies = lodash.cloneDeep( allergies );
        updatedAllergies = updatedAllergies.filter( allergy => allergy._id !== itemId );

        this.setState( { allergies: updatedAllergies } );

        this.updateUser( updatedAllergies );
    }

    removeAlreadySelectedItems = ( allergies, possibleAllergies ) => possibleAllergies
        .filter( item => !( allergies.find( allergy => allergy._id === item._id ) ) );

    mapAllergiesToKeyLabelPairs = possibleAllergies => possibleAllergies
        .map( item => ( {
            ...item,
            key: item._id,
            label: item.name,
        } ) );

    render() {
        const { allergies } = this.state;
        const { allergies: possibleAllergies } = this.props;

        const clonedPossibleAllergies = lodash.cloneDeep( possibleAllergies );
        let possibleMatches = this.removeAlreadySelectedItems( allergies, clonedPossibleAllergies );
        possibleMatches = this.mapAllergiesToKeyLabelPairs( possibleMatches );

        const clonedAllergies = lodash.cloneDeep( allergies );
        const displayableAllergies = this.mapAllergiesToKeyLabelPairs( clonedAllergies );

        return (
            <div className="dislikes-container">
                <h2>{i18n.t( KEYS.HEADERS.ALLERGIES_SELECTION )}</h2>
                {
                    allergies.length > 0
                    && <Tags tags={displayableAllergies} onDelete={this.onDelete} />
                }
                <div className="input-container">
                    <DataListInput
                        items={possibleMatches}
                        placeholder={i18n.t( KEYS.LABELS.ALLERGIES_PLACEHOLDER )}
                        onSelect={this.onSelect}
                        inputClassName="datalist-input-input"
                        dropdownClassName="datalist-input-dropdown"
                        itemClassName="datalist-input-item"
                        activeItemClassName="datalist-input-activeItem"
                        suppressReselect={false}
                        clearInputOnSelect
                    />
                </div>
            </div>
        );
    }
}

AllergiesContainer.contextType = UserStateContext;

AllergiesContainer.propTypes = {
    allergies: PropTypes.arrayOf(
        PropTypes.shape( {
            name: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        } ),
    ).isRequired,
};

export default AllergiesContainer;
