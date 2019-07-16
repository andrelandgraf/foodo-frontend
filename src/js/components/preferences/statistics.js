import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import statistic from '../../../img/statistic.svg';

import CustomButton from '../button/customButton';


const Statistics = ( { onClickStatistics } ) => (
    <CustomButton
        id="statistics-page"
        role="button"
        onClick={onClickStatistics}
    >
        {i18n.t( KEYS.LABELS.STATISTICS )}
        <img
            src={statistic}
            alt="Goto Statistic Page"
        />
    </CustomButton>
);

Statistics.propTypes = {
    onClickStatistics: PropTypes.func.isRequired,
};

export default Statistics;
