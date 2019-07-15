import React from 'react';
import PropTypes from 'prop-types';

const NutriScoreStat = ( { improvedScore } ) => (
    <div className="statistics-calculated-block">
        <h2>Gained NutriScore Points</h2>
        <span className="statistics-calculated-value" style={{ color: improvedScore >= 0 ? 'green' : 'red' }}>{improvedScore}</span>
    </div>
);

NutriScoreStat.propTypes = {
    improvedScore: PropTypes.number.isRequired,
};

export default NutriScoreStat;
