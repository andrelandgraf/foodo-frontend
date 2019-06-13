import React from 'react';
import PropTypes from 'prop-types';

import Cancel from '../../../img/cancel.svg';

import CustomButton from '../button/customButton';
import ImageButton from '../button/imageButton';

const Tag = ( { tag, onDelete, onClick } ) => (
    <div>
        <CustomButton
            onClick={onClick ? () => onClick( tag.id ) : undefined}
            id={`tag-click-${ tag.id }`}
        >
            <span>
                {tag.label}
            </span>
        </CustomButton>
        <ImageButton
            id={`tag-delete-${ tag.id }`}
            onClick={() => onDelete( tag.id )}
            src={Cancel}
            alt="Remove Dislike"
        />
    </div>
);

Tag.propTypes = {
    tag: PropTypes.shape( {
        label: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    } ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func,
};

Tag.defaultProps = {
    onClick: undefined,
};

export default Tag;
