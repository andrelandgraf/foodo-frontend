import { useState, useEffect } from 'react';

const MOBILE_WIDTH_BREAKPOINT = 750;

const useDeviceState = () => {
    const [ isMobile, setIsMobile ] = useState( MOBILE_WIDTH_BREAKPOINT >= window.innerWidth );
    const [ innerWidth, setInnerWidth ] = useState( window.innerWidth );

    useEffect( () => {
        const handleResize = () => {
            const widthIsMobile = MOBILE_WIDTH_BREAKPOINT >= window.innerWidth;
            setIsMobile( widthIsMobile );
            setInnerWidth( window.innerWidth );
        };

        window.addEventListener( 'resize', handleResize, true );
        window.addEventListener( 'deviceorientation', handleResize, true );

        return () => {
            window.removeEventListener( 'resize', handleResize );
            window.removeEventListener( 'deviceorientation', handleResize );
        };
    }, [] );

    return [ isMobile, innerWidth ];
};

export default useDeviceState;
