import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { getLifestyles, postLifestyle } from '../../services/foodo-api/user/profileService';

import { KEYS } from '../../utilities/internationalization/internationalization';

class LifestylesContainer extends React.Component {
    constructor( props ) {
        super( props );

        const { user } = this.props;
        const { lifestyle } = user;
        const userLifestyle = lifestyle ? lodash.cloneDeep( lifestyle ) : {};

        this.state = {
            lifestyles: [],
            lifestyle: userLifestyle,
        };
    }

    componentWillMount = () => {
        getLifestyles().then( lifestyles => this.setState( { lifestyles } ) );
    }

    onSelect = ( item ) => {
        const { lifestyle } = this.state;
        if ( item._id === lifestyle._id ) return;

        const newLifestyle = lodash.cloneDeep( item );
        this.setState( { lifestyle: newLifestyle } );

        postLifestyle( { name: newLifestyle.name, _id: newLifestyle._id } );
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
                        placeholder={lifestyle.name || i18n.t( KEYS.LABELS.LIFESTYLES_PLACEHOLDER )}
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
        lifestyle: PropTypes.shape( {
            name: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        } ),
    } ).isRequired,
};

export default LifestylesContainer;
