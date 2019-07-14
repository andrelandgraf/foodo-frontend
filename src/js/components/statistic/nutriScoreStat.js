import React from 'react';
import PropTypes from 'prop-types';

const NutriScoreStat = ( { improvedScore } ) => (
    <div>
        <h2>Gained NutriScore Points</h2>
        <span style={{ color: improvedScore >= 0 ? 'green' : 'red' }}>{improvedScore}</span>
    </div>
);

NutriScoreStat.propTypes = {
    improvedScore: PropTypes.number.isRequired,
};

export default NutriScoreStat;
