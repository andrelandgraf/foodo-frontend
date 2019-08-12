import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import Tag from './tag';

/**
 * Tags function to display a pool of tags
 * @param tags array
 * @param onDelete tag function
 * @param onClick tag function
 * @param showNoneTag if a none tag should be displayed if tags array is empty
 */
const Tags = ( {
    tags, onDelete, onClick, showNoneTag,
} ) => (
    <div className="tags">
        {
            tags.length || !showNoneTag
                ? tags.map( tag => (
                    <Tag
                        key={tag.key}
                        tag={tag}
                        onDelete={onDelete}
                        onClick={onClick}
                    />
                ) )
                : (
                    <Tag
                        key="mockup-tag"
                        tag={{ label: i18n.t( KEYS.LABELS.NONE ), key: 'mockup-tag' }}
                    />
                )
        }
    </div>
);

Tags.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape( {
            label: PropTypes.string.isRequired,
            key: PropTypes.oneOfType( [
                PropTypes.string,
                PropTypes.number,
            ] ).isRequired,
        } ),
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    showNoneTag: PropTypes.bool,
};

Tags.defaultProps = {
    onClick: undefined,
    showNoneTag: false,
};

export default Tags;
