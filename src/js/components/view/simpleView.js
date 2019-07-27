import React from 'react';
import PropTypes from 'prop-types';

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
