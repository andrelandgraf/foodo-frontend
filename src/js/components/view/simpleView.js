import React from 'react';
import PropTypes from 'prop-types';

/**
 * Container to display one view (page content)
 * @param title of the view (the headline)
 * @param classes further css classes for styling
 * @param children the page content
 */
const SimpleView = ( { title, classes, children } ) => (
    <div className={`page ${ classes }`}>
        { title }
        { children }
    </div>
);

SimpleView.propTypes = {
    title: PropTypes.oneOfType( [
        PropTypes.node,
        PropTypes.arrayOf(
            PropTypes.node,
        ),
        PropTypes.string,
    ] ),
    classes: PropTypes.string,
    children: PropTypes.oneOfType( [
        PropTypes.node,
        PropTypes.arrayOf(
            PropTypes.node,
        ),
    ] ),
};

SimpleView.defaultProps = {
    title: 'Title',
    classes: '',
    children: null,
};

export default SimpleView;
