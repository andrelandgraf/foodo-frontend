import React from 'react';
import PropTypes from 'prop-types';

const LinkImageButton = ( {
    href, src, alt, classes, onClick,
} ) => (
    <div className={classes}>
        <a href={href} onClick={onClick}>
            <img src={src} alt={alt} />
        </a>
    </div>
);

LinkImageButton.propTypes = {
    href: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    classes: PropTypes.string,
    onClick: PropTypes.func,
};

LinkImageButton.defaultProps = {
    classes: '',
    onClick: undefined,
};

export default LinkImageButton;
