import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../loading/loader';
import Box from './box';

/**
 * Boxgrid for displaying a grid of image box (netflix like)
 * @param recipes array
 * @param title a title for the grid
 * @param onClick onClick recipe function
 * @param isLoading if the grid should display an loading icon
 */
function Boxgrid( {
    recipes, title, onClick, isLoading,
} ) {
    return (
        <div className="box-view">
            { title }
            { !isLoading && recipes
                ? (
                    <div className="box-view-grid">
                        { recipes.map( r => <Box key={r.key} recipe={r} onClick={onClick} /> )}
                    </div>
                )
                : <Loader />
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
    isLoading: PropTypes.bool,
};

Boxgrid.defaultProps = {
    recipes: undefined,
    isLoading: false,
};

export default Boxgrid;
