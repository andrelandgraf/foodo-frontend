import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { postLifestyle } from '../../services/foodo-api/user/profileService';

import { KEYS } from '../../utilities/internationalization/internationalization';
import { UserStateContext } from '../../provider/UserStateProvider';

class LifestylesContainer extends React.Component {
    updateUser = ( newLifestyle ) => {
        const { user, setUser } = this.context;
        const updatedUser = lodash.cloneDeep( user );
        updatedUser.lifestyle = newLifestyle;
        setUser( updatedUser );
    }

    onSelect = ( item ) => {
        const { user } = this.context;
        const { lifestyle } = user;
        if ( lifestyle && lifestyle._id === item._id ) return;

        const newLifestyle = lodash.cloneDeep( item );
        postLifestyle( { name: newLifestyle.name, _id: newLifestyle._id } );
        this.updateUser( newLifestyle );
    }

    mapLifestylesToKeyLabelPairs = lifestyles => lifestyles
        .map( item => ( {
            ...item,
            key: item._id,
            label: item.name,
        } ) );

    render() {
        const { user } = this.context;
        const { lifestyles } = this.props;

        const lifestyle = user.lifestyle ? lodash.cloneDeep( user.lifestyle ) : {};
        const clonedLifestyles = lodash.cloneDeep( lifestyles );

        const possibleMatches = this.mapLifestylesToKeyLabelPairs( clonedLifestyles );

        return (
            <div className="dislikes-container">
                <h2>{i18n.t( KEYS.HEADERS.LIFESTYLES_SELECTION )}</h2>
                <div className="input-container">
                    <DataListInput
                        items={possibleMatches}
                        placeholder={i18n.t( KEYS.LABELS.LIFESTYLES_PLACEHOLDER )}
                        onSelect={this.onSelect}
                        clearInputOnSelect={false}
                        suppressReselect={false}
                        inputClassName="datalist-input-input"
                        dropdownClassName="datalist-input-dropdown"
                        itemClassName="datalist-input-item"
                        activeItemClassName="datalist-input-activeItem"
                        initialValue={lifestyle.name || ''}
                    />
                </div>
            </div>
        );
    }
}

LifestylesContainer.contextType = UserStateContext;

LifestylesContainer.propTypes = {
    lifestyles: PropTypes.arrayOf(
        PropTypes.shape( {
            name: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        } ),
    ).isRequired,
};

export default LifestylesContainer;
