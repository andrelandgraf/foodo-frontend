import React from 'react';
import PropTypes from 'prop-types';

import Tag from './tag';

const Tags = ( { tags, onDelete } ) => (
    <div className="tags">
        {
            tags.map( tag => <Tag key={`dislike-${ tag.id }`} tag={tag} onDelete={onDelete} /> )
        }
    </div>
);

Tags.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape( {
            label: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        } ),
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Tags;
