import React from 'react';
import PropTypes from 'prop-types';

import CustomButton from '../button/customButton';


const PreferenceItem = ( {
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

PreferenceItem.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    visible: PropTypes.bool,
};

PreferenceItem.defaultProps = {
    visible: true,
};

export default PreferenceItem;
