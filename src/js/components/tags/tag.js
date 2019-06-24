import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Cancel from '../../../img/cancel.svg';

import CustomButton from '../button/customButton';
import ImageButton from '../button/imageButton';

function Tag( { tag, onDelete, onClick } ) {
    const onClickTagCallback = useCallback(
        () => onClick && onClick( tag ), [ tag, onClick ],
    );
    const onClickDeleteCallback = useCallback(
        () => onDelete && onDelete( tag.key ), [ tag, onDelete ],
    );

    return (
        <div className="tag">
            <CustomButton
                onClick={onClickTagCallback}
                id={`tag-click-${ tag.key }`}
            >
                <span>
                    {tag.label}
                </span>
            </CustomButton>
            <ImageButton
                id={`tag-delete-${ tag.key }`}
                onClick={onClickDeleteCallback}
                src={Cancel}
                alt="Remove Tag"
            />
        </div>
    );
}

Tag.propTypes = {
    tag: PropTypes.shape( {
        label: PropTypes.string.isRequired,
        key: PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.number,
        ] ).isRequired,
    } ).isRequired,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
};

Tag.defaultProps = {
    onClick: undefined,
    onDelete: undefined,
};

export default Tag;
