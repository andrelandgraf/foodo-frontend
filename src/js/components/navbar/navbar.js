import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ( { children } ) => (
    <ul className="navarbar">
        { children }
    </ul>
);

NavBar.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.node,
    ),
};

NavBar.defaultProps = {
    children: undefined,
};

export default NavBar;
