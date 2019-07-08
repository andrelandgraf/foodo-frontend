import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../loading/loader';
import Box from '../box/box';

function Boxgrid( { recipes, title, onClick } ) {
    return (
        <div className="box-view">
            { title }
            { recipes
                ? (
                    <div className="box-view-grid">
                        { recipes.map( r => <Box key={r.key} recipe={r} onClick={onClick} /> )}
                    </div>
                )
                : <Loader key="lodaing-recipes" />
            }
        </div>
    );
}

Boxgrid.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape( {
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            notForAllergies: PropTypes.arrayOf(
                PropTypes.string.isRequired,
            ).isRequired,
            notForLifestyle: PropTypes.string.isRequired,
        } ).isRequired,
    ),
    title: PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.node,
    ] ).isRequired,
    onClick: PropTypes.func.isRequired,
};

Boxgrid.defaultProps = {
    recipes: undefined,
};

export default Boxgrid;
