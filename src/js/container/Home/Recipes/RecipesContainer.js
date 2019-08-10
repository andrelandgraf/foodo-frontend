import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import DataListInput from 'react-datalist-input';

import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';

import { UserStateContext } from '../../../provider/UserStateProvider';
import useDisplayableRecipes from '../../../hooks/useDisplayableRecipes';

import { AUTH_ROUTES } from '../../App/App';
import Message, { MESSAGE_TYPES } from '../../../components/message/message';

function RecipesContainer() {
    const { displayableRecipes } = useDisplayableRecipes();
    const { user } = useContext( UserStateContext );

    const { goal } = user;
    const userPickedGoal = goal && goal._id;

    const renderProfileLink = () => (
        <span>
            { i18n.t( KEYS.MESSAGES.GO_TO_PROFILE_1 ) }
            <Link to={AUTH_ROUTES.PROFILE}>{ i18n.t( KEYS.LABELS.PROFILE ) }</Link>
            { i18n.t( KEYS.MESSAGES.GO_TO_PROFILE_2 ) }
        </span>
    );

    const [ selectedId, setSelectedId ] = useState();
    const [ message, setMessage ] = useState( userPickedGoal ? '' : renderProfileLink() );
    const [ messageType, setMessageType ] = useState( userPickedGoal
        ? undefined : MESSAGE_TYPES.WARNING );


    const onSelectRecipe = ( recipe ) => {
        if ( !recipe ) return;
        setSelectedId( recipe._id );
    };

    const clearMessage = () => {
        setMessage( '' );
        setMessageType( undefined );
    };

    const renderMessage = () => (
        <Message type={messageType} message={message} onResolve={clearMessage} />
    );

    if ( selectedId ) {
        return <Redirect push to={`${ AUTH_ROUTES.COOKING }${ selectedId }`} />;
    }

    return (
        <div className="recipes-container">
            <h2>{i18n.t( KEYS.HEADERS.SELECT_RECIPE )}</h2>
            {
                message ? renderMessage( message, messageType ) : undefined
            }
            <div className="input-container">
                <DataListInput
                    items={displayableRecipes}
                    placeholder={i18n.t( KEYS.LABELS.SELECT_RECIPE_PLACEHOLDER )}
                    onSelect={onSelectRecipe}
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

export default RecipesContainer;
