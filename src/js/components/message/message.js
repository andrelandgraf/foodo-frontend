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

const Message = ( { type, text, onResolve } ) => (
    <div className={`box message-box ${ type }-message`}>
        { text }
        <ImageButton id="dismiss-message" alt="dismiss message" src={Cancel} onClick={onResolve} />
    </div>
);

Message.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    onResolve: PropTypes.func.isRequired,
};

Message.defaultProps = {
    type: 'info',
};

export default Message;
