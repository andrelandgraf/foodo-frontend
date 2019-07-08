import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import CustomButton from '../button/customButton';
import { getLocale } from '../../utilities/internationalization/internationalization';

function Box( { recipe, onClick } ) {
    const onClickBox = useCallback( () => onClick( recipe.key ), [ recipe ] );
    const style = {
        backgroundImage: `url( ${ recipe.imgUrl } )`,
    };
    const formatter = new Intl.ListFormat( getLocale(), { style: 'short', type: 'conjunction' } );
    const allergiesList = formatter.format( recipe.notForAllergies );
    return (
        <CustomButton onClick={onClickBox} id={`box-${ recipe.key }`}>
            <div className="box" style={style}>
                { recipe.notForAllergies.length
                    ? (
                        <span className="box-allergies">
                            {`Contains ${ allergiesList }`}
                        </span>
                    )
                    : null
                }
                { recipe.notForLifestyle
                    ? (
                        <span className="box-notlifestyle">
                            {`Not ${ recipe.notForLifestyle }`}
                        </span>
                    )
                    : null
                }
                <span className="box-label">
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
        notForAllergies: PropTypes.arrayOf(
            PropTypes.string.isRequired,
        ).isRequired,
        notForLifestyle: PropTypes.string.isRequired,
    } ).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Box;
