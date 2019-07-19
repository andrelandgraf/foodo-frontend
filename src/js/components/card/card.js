import React from 'react';
import PropTypes from 'prop-types';

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
