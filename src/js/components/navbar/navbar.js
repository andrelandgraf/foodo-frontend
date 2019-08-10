import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ( { children } ) => (
    <nav>
        <ul className="navbar">
            { children }
        </ul>
    </nav>
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
