import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


const PreferenceLink = ( {
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

PreferenceLink.propTypes = {
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

PreferenceLink.defaultProps = {
    onClick: undefined,
    visible: true,
};

export default PreferenceLink;
