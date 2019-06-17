import React from 'react';
import PropTypes from 'prop-types';
import DataListInput from 'react-datalist-input';
import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

class LifestylesContainer extends React.Component {
    constructor( props ) {
        super( props );

        const { user } = this.props;
        const { lifestyle } = user;
        let userLifestyle = lodash.cloneDeep( lifestyle );
        // TODO remove this test if we have set lifestyle in user to required in props
        if ( !lifestyle ) userLifestyle = {};

        this.state = {
            lifestyles: undefined,
            // eslint-disable-next-line react/no-unused-state
            lifestyle: userLifestyle,
        };
    }

    componentWillMount = async () => {
        const { lifestyles } = this.state;
        if ( !lifestyles ) {
            // TODO get lifestyles from backend via FoodItemsService
            this.setState( {
                // mockup data
                lifestyles: [
                    {
                        name: 'Lion',
                        _id: '1',
                    },
                    {
                        name: 'Vegetarian',
                        _id: '2',
                    },
                    {
                        name: 'Vegan',
                        _id: '3',
                    },
                ],
            } );
        }
    }

    onSelect = ( item ) => {
        const { lifestyle } = this.state;
        if ( item._id === lifestyle._id ) return;
        const newLifestyle = lodash.cloneDeep( item );
        // TODO update backend
        this.setState( { lifestyle: newLifestyle } );
    }

    mapGoalToDataListInput = lifestyles => lifestyles
        .map( item => ( {
            ...item,
            key: item._id,
            label: item.name,
        } ) );

    render() {
        const { lifestyle, lifestyles } = this.state;
        const clonedLifestyles = lodash.cloneDeep( lifestyles );
        const possibleMatches = this.mapGoalToDataListInput( clonedLifestyles );

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
        // TODO make lifestyle required when we have the backend logic for it
        lifestyle: PropTypes.array,
    } ).isRequired,
};

export default LifestylesContainer;
