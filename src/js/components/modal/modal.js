import React from 'react';
import PropTypes from 'prop-types';

import cancel from '../../../img/cancel.svg';

import ImageButton from '../button/imageButton';

const Modal = ( {
    children, classes, onCloseModal, Title,
} ) => (
    <div className={`modal ${ classes }`}>
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


Modal.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf(
            PropTypes.node,
        ),
        PropTypes.node,
    ] ).isRequired,
    classes: PropTypes.string,
    onCloseModal: PropTypes.func.isRequired,
    Title: PropTypes.node,
};

Modal.defaultProps = {
    classes: '',
    Title: null,
};

export default Modal;
