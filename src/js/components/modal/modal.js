import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import cancel from '../../../img/cancel.svg';

import ImageButton from '../button/imageButton';

/**
 * Modal component to display modal dialogues
 * @param children the content of the modal view
 * @param classes further css classes for styling
 * @param onCloseModal function
 * @param Title title component of the modal
 */
function Modal( {
    children, classes, onCloseModal, Title,
} ) {
    // onClick outside of modal should close modal
    useEffect( () => {
        const onClickOutside = () => onCloseModal();
        window.addEventListener( 'click', onClickOutside, false );
        return () => window.removeEventListener( 'click', onClickOutside );
    }, [] );

    return (
        <div
            className={`modal ${ classes }`}
            onClick={event => event.stopPropagation()}
            role="presentation"
        >
            <div className="header">
                <div className="title">
                    { Title }
                </div>
                <ImageButton
                    src={cancel}
                    alt="close modal"
                    id="close-modal-button"
                    onClick={onCloseModal}
                    classes="close-button"
                />
            </div>
            {children}
        </div>
    );
}


Modal.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.node,
    ),
    classes: PropTypes.string,
    onCloseModal: PropTypes.func.isRequired,
    Title: PropTypes.node,
};

Modal.defaultProps = {
    classes: '',
    Title: null,
    children: null,
};

export default Modal;
