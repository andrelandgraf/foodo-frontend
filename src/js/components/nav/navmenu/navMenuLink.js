import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * A navigation menu link item
 * @param to ref to the content (link)
 * @param onClick further side effects function
 * @param label text of the link item
 * @param icon to be displayed next to label
 * @param alt description of the icon
 * @param visible if the navmenu item should be displayed (styling)
 */
const NavMenuLink = ( {
    to, onClick, label, icon, alt, visible,
} ) => (
    <>
        {
            visible && (
                <NavLink to={to} onClick={onClick} activeClassName="current">
                    <div className="item-link">
                        {label}
                        <img
                            src={icon}
                            alt={alt}
                        />
                    </div>
                </NavLink>
            )
        }
    </>
);

NavMenuLink.propTypes = {
    to: PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.func,
    ] ).isRequired,
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    visible: PropTypes.bool,
};

NavMenuLink.defaultProps = {
    onClick: undefined,
    visible: true,
};

export default NavMenuLink;
