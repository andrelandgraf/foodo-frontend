import React from 'react';
import PropTypes from 'prop-types';

const Content = ( { children, classes } ) => (
    <div className={`container ${ classes }`}>
        { children}
    </div>
);

Content.propTypes = {
    classes: PropTypes.string,
    children: PropTypes.oneOfType( [
        PropTypes.node,
        PropTypes.arrayOf(
            PropTypes.node,
        ),
    ] ),
};

Content.defaultProps = {
    classes: '',
    children: null,
};

export default Content;
