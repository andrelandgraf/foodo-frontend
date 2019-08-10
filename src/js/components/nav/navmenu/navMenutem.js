import React from 'react';
import PropTypes from 'prop-types';

import CustomButton from '../../button/customButton';

/**
 * A navigation menu button item
 * @param id unique id of the button
 * @param onClick function
 * @param label text of the item
 * @param icon to be displayed next to label
 * @param alt description of the icon
 * @param visible if the navmenu item should be displayed (styling)
 */
const NavMenuItem = ( {
    id, onClick, label, icon, alt, visible,
} ) => (
    <>
        {
            visible && (
                <CustomButton
                    id={id}
                    role="button"
                    onClick={onClick}
                >
                    {label}
                    <img
                        src={icon}
                        alt={alt}
                    />
                </CustomButton>
            )
        }
    </>
);

NavMenuItem.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    visible: PropTypes.bool,
};

NavMenuItem.defaultProps = {
    visible: true,
};

export default NavMenuItem;
