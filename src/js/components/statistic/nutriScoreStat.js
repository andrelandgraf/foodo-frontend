import React from 'react';
import PropTypes from 'prop-types';

const NutriScoreStat = ( { improvedScore } ) => (
    <div style={{ color: '#000' }}>
        <h2 style={{ color: '#000' }}>Overall Improved NutriScore Points</h2>
        {improvedScore}
    </div>
);

NutriScoreStat.propTypes = {
    improvedScore: PropTypes.number.isRequired,
};

export default NutriScoreStat;
