import React from 'react';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';
import StatisticsContainer from '../container/Statistics/StatisticsContainer';

const StatisticsView = () => (
    <div className="container">
        <h1 className="statistics-header">{i18n.t( KEYS.HEADERS.STATISTICS )}</h1>
        <StatisticsContainer />
    </div>
);

export default StatisticsView;
