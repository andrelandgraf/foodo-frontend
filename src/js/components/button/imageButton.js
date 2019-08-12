import React from 'react';
import PropTypes from 'prop-types';

import CustomButton from './customButton';

/**
 * Image Button to further abstract CustomButton for clickable images
 * @param id unique id of the button
 * @param classes further css classes for styling
 * @param onClick function
 * @param src image src
 * @param alt image description
 */
const ImageButton = ( {
    classes, id, onClick, src, alt,
} ) => (
    <CustomButton id={id} classes={classes} onClick={onClick}>
        <img alt={alt} src={src} />
    </CustomButton>
);

ImageButton.propTypes = {
    id: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    classes: PropTypes.string,
    onClick: PropTypes.func,
};

ImageButton.defaultProps = {
    classes: '',
    onClick: undefined,
};

export default ImageButton;
