import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS, getLocale } from '../../utilities/internationalization/internationalization';

import CustomButton from '../button/customButton';

/**
 * Box of the recipes Boxgrid
 * @param recipe that you want to display
 * @param onClick recipe onClick function
 */
function Box( { recipe, onClick } ) {
    const onClickBox = useCallback( () => onClick( recipe.key ), [ recipe ] );
    const style = {
        backgroundImage: `url( ${ recipe.imgUrl } )`,
    };
    const allergiesList = Intl.ListFormat
        ? new Intl.ListFormat( getLocale(), { style: 'short', type: 'conjunction' } )
            .format( recipe.notForAllergies )
        : recipe.notForAllergies.join( ', ' );
    return (
        <CustomButton onClick={onClickBox} id={`box-${ recipe.key }`}>
            <div className="box" style={style}>
                { recipe.notForAllergies.length
                    ? (
                        <span className="box-allergies">
                            {`${ i18n.t( KEYS.LABELS.CONTAINS ) } ${ allergiesList }`}
                        </span>
                    )
                    : null
                }
                { recipe.notForLifestyle
                    ? (
                        <span className="box-notlifestyle">
                            {`${ i18n.t( KEYS.LABELS.NOT ) } ${ recipe.notForLifestyle }`}
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
