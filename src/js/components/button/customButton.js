import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component to display more sophisticated button structures
 * @param id unique id of the button
 * @param classes further css classes for styling
 * @param onClick function
 * @param children the wrapped children components that are the button content
 */
const CustomButton = ( {
    id, classes, onClick, children,
} ) => (
    <div
        className={`custom-button ${ classes }`}
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
        { children }
    </div>
);

CustomButton.propTypes = {
    id: PropTypes.string.isRequired,
    classes: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType( [
        PropTypes.func,
        PropTypes.node,
    ] ).isRequired,
};

CustomButton.defaultProps = {
    classes: '',
    onClick: undefined,
};

export default CustomButton;
