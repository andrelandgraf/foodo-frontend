import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as ArrowRight } from '../../../img/arrow-right.svg';
import { ReactComponent as ArrowLeft } from '../../../img/arrow-left.svg';

function Carousel( { children } ) {
    return (
        <div className="carousel">
            <ArrowLeft />
            <div className="carousel-items">
                {children}
            </div>
            <ArrowRight />
        </div>
    );
}

Carousel.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.node,
    ).isRequired,
};

export default Carousel;
