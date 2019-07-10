import React from 'react';
import PropTypes from 'prop-types';

const NutriScoreStat = ( { improvedScore } ) => (
    <div>
        {improvedScore}
    </div>
);

NutriScoreStat.propTypes = {
    improvedScore: PropTypes.number.isRequired,
};

export default NutriScoreStat;
