import React from 'react';
import PropTypes from 'prop-types';

import { BUTTON_STYLES } from './button';

const ImageButton = ( {
    classes, id, onClick, src, alt,
} ) => (
    <div
        className={`${ BUTTON_STYLES } ${ classes || undefined }`}
        id={id}
        tabIndex={0}
        role="button"
        onClick={onClick}
        onKeyUp={( event ) => {
            if ( event.keyCode === 13 ) {
                event.preventDefault();
                // Trigger the button element with a click
                document.getElementById( id ).click();
            }
        }}
    >
        <img alt={alt} src={src} />
    </div>
);

ImageButton.propTypes = {
    id: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    classes: PropTypes.string,
    onClick: PropTypes.func,
};

ImageButton.defaultProps = {
    classes: '',
    onClick: undefined,
};

export default ImageButton;
