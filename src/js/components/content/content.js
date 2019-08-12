import React from 'react';
import PropTypes from 'prop-types';

/**
 * Abstracting component for styling purposes.
 * Use this component within a Simple View to display your page content.
 * @param children content
 * @param classes further css classes for styling
 */
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
