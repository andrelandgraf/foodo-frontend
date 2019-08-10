import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Spinner } from '../../../img/loader.svg';

const getLoaderClass = ( fullpage, tiny ) => {
    if ( fullpage ) {
        return 'fullpage-spinner';
    }
    if ( tiny ) {
        return 'small-spinner';
    }
    return 'spinner';
};

/**
 * Loading spinner component
 * @param fullpage if the loading spinner should disable all content
 * @param message message to be displayed next to the spinner
 * @param tiny if a tiny spinner should be displayed e.g. to be used inside a button
 */
const Loader = ( { fullpage, message, tiny } ) => (
    <div className={getLoaderClass( fullpage, tiny )}>
        <Spinner />
        {message}
    </div>
);

Loader.propTypes = {
    fullpage: PropTypes.bool,
    tiny: PropTypes.bool,
    message: PropTypes.string,

};

Loader.defaultProps = {
    fullpage: false,
    tiny: false,
    message: '',
};

export default Loader;
