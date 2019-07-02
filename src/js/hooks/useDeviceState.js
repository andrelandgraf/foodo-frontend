import { useState, useEffect } from 'react';

const MOBILE_WIDTH_BREAKPOINT = 750;

const useDeviceState = () => {
    const [ isMobile, setIsMobile ] = useState( MOBILE_WIDTH_BREAKPOINT >= window.innerWidth );

    useEffect( () => {
        const handleResize = () => {
            const widthIsMobile = MOBILE_WIDTH_BREAKPOINT >= window.innerWidth;
            setIsMobile( widthIsMobile );
        };

        window.addEventListener( 'resize', handleResize );

        return () => window.removeEventListener( 'resize', handleResize );
    }, [] );

    return isMobile;
};

export default useDeviceState;
