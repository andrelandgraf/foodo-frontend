import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * one navigation item
 * @param label name of the item
 * @param link nav link to the content
 * @param float direction of floating (styling) e.g. float to right or left side
 * @param hideOnMobile if the item should be displayed on mobile
 */
const NavBarItem = ( {
    label, link, float, hideOnMobile,
} ) => {
    const classes = hideOnMobile ? 'not-displayed-on-mobile' : '';
    const floating = float === 'right' ? 'item-right' : '';
    return (
        <li className={`${ floating } ${ classes }`}>
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
};

NavBarItem.propTypes = {
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    float: PropTypes.string.isRequired,
    hideOnMobile: PropTypes.bool,
};

NavBarItem.defaultProps = {
    hideOnMobile: false,
};

export default NavBarItem;
