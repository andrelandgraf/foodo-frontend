import React from 'react';
import PropTypes from 'prop-types';

/**
 * card component to display text and content with a white bordered background
 * @param children content to be displayed
 * @param classes further css classes for styling
 */
const Card = ( { children, classes } ) => (
    <div className={`card ${ classes }`}>
        { children}
    </div>
);

Card.propTypes = {
    classes: PropTypes.string,
    children: PropTypes.oneOfType( [
        PropTypes.node,
        PropTypes.arrayOf(
            PropTypes.node,
        ),
    ] ),
};

Card.defaultProps = {
    classes: '',
    children: null,
};

export default Card;
