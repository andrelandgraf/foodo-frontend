import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import CustomButton from '../button/customButton';

function Box( { recipe, onClick } ) {
    const onClickBox = useCallback( () => onClick( recipe.key ), [ recipe ] );
    const style = {
        backgroundImage: `url( ${ recipe.imgUrl } )`,
    };
    return (
        <CustomButton onClick={onClickBox} id={`box-${ recipe.key }`}>
            <div className="box" style={style}>
                <span>
                    {recipe.label}
                </span>
            </div>
        </CustomButton>
    );
}

Box.propTypes = {
    recipe: PropTypes.shape( {
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired,
    } ).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Box;
