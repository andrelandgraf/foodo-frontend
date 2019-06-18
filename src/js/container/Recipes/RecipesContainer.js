import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import DataListInput from 'react-datalist-input';

import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { AUTH_ROUTES } from '../App/App';
import { getRecipes } from '../../services/foodo-api/recipe/recipesService';
import Message, { MESSAGE_TYPES } from '../../components/message/message';

class RecipesContainer extends React.Component {
    constructor( props ) {
        super( props );

        const { user } = this.props;
        const { goal } = user;

        const userPickedGoal = goal && goal._id;
        const message = userPickedGoal ? '' : this.renderProfileLink();
        const messageType = userPickedGoal ? undefined : MESSAGE_TYPES.WARNING;

        this.state = {
            recipes: [],
            selectedId: undefined,
            message,
            messageType,
        };
    }

    componentWillMount = () => {
        getRecipes().then( recipes => this.setState( { recipes } ) );
    }

    onSelectRecipe = ( recipe ) => {
        if ( !recipe ) return;
        this.setState( { selectedId: recipe._id } );
    }

    mapRecipesToDataListInput = recipes => recipes
        .map( recipe => ( { ...recipe, label: recipe.name, key: recipe._id } ) )

    clearMessage = () => {
        this.setState( { message: '', messageType: undefined } );
    }

    renderMessage = ( message, messageType ) => (
        <Message type={messageType} text={message} onResolve={this.clearMessage} />
    )

    renderProfileLink = () => (
        <span>
            { i18n.t( KEYS.MESSAGES.GO_TO_PROFILE_1 ) }
            <Link to={AUTH_ROUTES.PROFILE}>{ i18n.t( KEYS.LABELS.PROFILE ) }</Link>
            { i18n.t( KEYS.MESSAGES.GO_TO_PROFILE_2 ) }
        </span>
    );

    renderRedirect = id => <Redirect push to={`${ AUTH_ROUTES.COOKING }${ id }`} />

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
            _id: PropTypes.string.isRequired,
        } ),
    } ).isRequired,
};

export default RecipesContainer;
