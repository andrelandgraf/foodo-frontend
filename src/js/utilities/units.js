/* eslint-disable import/prefer-default-export */
export const unitToLabel = ( unit ) => {
    switch ( unit ) {
    case 'gramm': return 'g';
    case 'ml': return unit;
    default: return unit;
    }
};
