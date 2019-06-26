import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LayoutContext = React.createContext( {
    showNavBar: true,
    setShowNavBar: () => {},
} );

function LayoutProvider( { children } ) {
    const [ showNavBar, setShowNavBar ] = useState( true );

    const context = {
        showNavBar,
        setShowNavBar,
    };

    return (
        <LayoutContext.Provider value={context}>
            {children}
        </LayoutContext.Provider>
    );
}

LayoutProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { LayoutContext, LayoutProvider };
