import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import DataListInput from 'react-datalist-input';

import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { AUTH_ROUTES } from '../App/App';
import Message, { MESSAGE_TYPES } from '../../components/message/message';

class RecipesContainer extends React.Component {
    testData = [
        {
            name: 'Bolognese',
            id: 1,
        },
        {
            name: 'Pizza Brot',
            id: 2,
        },
        {
            name: 'Hawai Toast',
            id: 3,
        },
        {
            name: 'Spagghetti Arabiate',
            id: 4,
        },
        {
            name: 'Pilzragout',
            id: 5,
        },
    ];

    constructor( props ) {
        super( props );

        const { user } = this.props;
        const { goal } = user;

        const userPickedGoal = goal && goal.id;
        const message = userPickedGoal ? '' : this.renderProfileLink();
        const messageType = userPickedGoal ? undefined : MESSAGE_TYPES.WARNING;

        this.state = {
            recipes: undefined,
            selectedId: undefined,
            message,
            messageType,
        };
    }

    componentWillMount = () => {
        const { recipes } = this.state;

        if ( !recipes ) {
            // TODO call backend to get standard recipes
            this.setState( { recipes: this.testData } );
        }
    }

    onSelectRecipe = ( recipe ) => {
        if ( !recipe ) return;
        this.setState( { selectedId: recipe.id } );
    }

    mapRecipesToDataListInput = recipes => recipes
        .map( recipe => ( { ...recipe, label: recipe.name, key: recipe.id } ) )

    clearMessage = () => {
        this.setState( { message: '', messageType: undefined } );
    }

    renderMessage = ( message, messageType ) => (
        <Message type={messageType} text={message} onResolve={this.clearMessage} />
    )

    renderProfileLink = () => (
        <span>
            Check out your
            <Link to={AUTH_ROUTES.PROFILE}> Profile </Link>
            and select a personal nutrition goal.
        </span>
    );

    renderRedirect = id => <Redirect to={`${ AUTH_ROUTES.COOKING }${ id }`} />

    render() {
        const {
            recipes, selectedId, message, messageType,
        } = this.state;
        const possibleRecipes = this.mapRecipesToDataListInput( lodash.cloneDeep( recipes ) );
        if ( selectedId ) {
            return this.renderRedirect( selectedId );
        }

        return (
            <div className="recipes-container">
                <h2>{i18n.t( KEYS.HEADERS.SELECT_RECIPE )}</h2>
                {
                    message ? this.renderMessage( message, messageType ) : undefined
                }
                <div className="input-container">
                    <DataListInput
                        items={possibleRecipes}
                        placeholder={i18n.t( KEYS.LABELS.SELECT_RECIPE_PLACEHOLDER )}
                        onSelect={this.onSelectRecipe}
                        suppressReselect={false}
                        clearInputOnSelect
                    />
                </div>
            </div>
        );
    }
}

RecipesContainer.propTypes = {
    user: PropTypes.shape( {
        goal: PropTypes.shape( {
            name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        } ),
    } ).isRequired,
};

export default RecipesContainer;
