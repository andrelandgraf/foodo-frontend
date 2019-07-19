import React from 'react';
import PropTypes from 'prop-types';

const Container = ( { children, classes } ) => (
    <div className={`container ${ classes }`}>
        { children}
    </div>
);

Container.propTypes = {
    classes: PropTypes.string,
    children: PropTypes.oneOfType( [
        PropTypes.node,
        PropTypes.arrayOf(
            PropTypes.node,
        ),
    ] ),
};

Container.defaultProps = {
    classes: '',
    children: null,
};

export default Container;
