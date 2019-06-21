import React from 'react';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { getLifestyles, postLifestyle } from '../../services/foodo-api/user/profileService';

import { KEYS } from '../../utilities/internationalization/internationalization';
import { UserStateContext } from '../../provider/UserStateProvider';

class LifestylesContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            lifestyles: [],
            lifestyle: {},
        };
    }

    componentWillMount = () => {
        const { user } = this.context;
        const { lifestyle } = user;
        const userLifestyle = lifestyle ? lodash.cloneDeep( lifestyle ) : {};

        getLifestyles()
            .then( lifestyles => this.setState( { lifestyles, lifestyle: userLifestyle } ) );
    }

    updateUser = ( newLifestyle ) => {
        const { user, setUser } = this.context;
        const updatedUser = lodash.cloneDeep( user );
        updatedUser.lifestyle = newLifestyle;
        setUser( updatedUser );
    }

    onSelect = ( item ) => {
        const { lifestyle } = this.state;
        if ( item._id === lifestyle._id ) return;

        const newLifestyle = lodash.cloneDeep( item );
        this.setState( { lifestyle: newLifestyle } );

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
        const { lifestyle, lifestyles } = this.state;
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

export default LifestylesContainer;
