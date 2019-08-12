import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import arrowRight from '../../../img/arrow-right.svg';
import arrowLeft from '../../../img/arrow-left.svg';

import ImageButton from '../button/imageButton';

/**
 * A simple carousel component to display browse through the child components
 * (e.g. rotating through content)
 * @param children the array of content
 */
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
                        i === currentIndex
                            ? (
                                <li key={child.props.id}>
                                    {child}
                                </li>
                            )
                            : null
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
