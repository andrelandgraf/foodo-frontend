import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavBarItem = ( { label, link, float } ) => (
    <li className={float === 'right' ? 'item-right' : undefined}>
        <NavLink
            exact
            activeClassName="current-page"
            to={link}
        >
            <p className="text-item">
                { label }
            </p>
        </NavLink>
    </li>
);

NavBarItem.propTypes = {
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    float: PropTypes.string.isRequired,
};

export default NavBarItem;
