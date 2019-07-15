import React from 'react';
import PropTypes from 'prop-types';

import Cancel from '../../../img/cancel.svg';

import ImageButton from '../button/imageButton';

export const MESSAGE_TYPES = {
    SUCCESS: 'success',
    ERR: 'err',
    WARNING: 'warning',
    INFO: 'info',
};

const Message = ( {
    type, message, onResolve, classes,
} ) => (
    <div className={`box message-box ${ type }-message ${ classes }`}>
        <span>{ message }</span>
        <ImageButton id="dismiss-message" alt="dismiss message" src={Cancel} onClick={onResolve} />
    </div>
);

Message.propTypes = {
    message: PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.node,
    ] ).isRequired,
    type: PropTypes.string,
    onResolve: PropTypes.func.isRequired,
    classes: PropTypes.string,
};

Message.defaultProps = {
    type: 'info',
    classes: '',
};

export default Message;
