import React from 'react';
import PropTypes from 'prop-types';

import Cancel from '../../../img/cancel.svg';

import CustomButton from '../button/customButton';
import ImageButton from '../button/imageButton';

const Tag = ( { tag, onDelete, onClick } ) => (
    <div className="tag">
        <CustomButton
            onClick={onClick ? () => onClick( tag.key ) : undefined}
            id={`tag-click-${ tag.key }`}
        >
            <span>
                {tag.label}
            </span>
        </CustomButton>
        <ImageButton
            id={`tag-delete-${ tag.key }`}
            onClick={() => onDelete( tag.key )}
            src={Cancel}
            alt="Remove Dislike"
        />
    </div>
);

Tag.propTypes = {
    tag: PropTypes.shape( {
        label: PropTypes.string.isRequired,
        key: PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.number,
        ] ).isRequired,
    } ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func,
};

Tag.defaultProps = {
    onClick: undefined,
};

export default Tag;
