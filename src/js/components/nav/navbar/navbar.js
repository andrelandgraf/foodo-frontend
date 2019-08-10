import React from 'react';
import PropTypes from 'prop-types';

/**
 * NavBar of the page
 * @param children the navbar content
 */
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
