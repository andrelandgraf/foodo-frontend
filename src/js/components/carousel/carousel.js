import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import arrowRight from '../../../img/arrow-right.svg';
import arrowLeft from '../../../img/arrow-left.svg';

import ImageButton from '../button/imageButton';

function Carousel( { children } ) {
    const getIndexByNumber = useCallback( number => ( number + children.length ) % children.length,
        [ children ] );
    const [ currentIndex, setCurrentIndex ] = useState( 0 );

    return (
        <div className="carousel">
            <ImageButton
                src={arrowLeft}
                id="scroll-left"
                alt="scroll down"
                onClick={() => setCurrentIndex( getIndexByNumber( currentIndex - 1 ) )}
            />
            <ul>
                {
                    children.map( ( child, i ) => (
                        <li
                            key={child.props.id}
                            className={i === currentIndex ? 'carousel-current-item' : null}
                        >
                            {child}
                        </li>
                    ) )
                }
            </ul>
            <ImageButton
                id="scroll-right"
                src={arrowRight}
                alt="scroll down"
                onClick={() => setCurrentIndex( getIndexByNumber( currentIndex + 1 ) )}
            />
        </div>
    );
}

Carousel.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.node,
    ).isRequired,
};

export default Carousel;
