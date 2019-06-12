/* eslint-disable import/prefer-default-export */
import { deData, dedeData } from './de';
import {
    enData, enauData, encaData, engbData, eninData, enusData,
} from './en';

// constructs i18n and l10n data structure
export const languageStrings = {
    de: deData,
    'de-DE': dedeData,
    en: enData,
    'en-AU': enauData,
    'en-CA': encaData,
    'en-GB': engbData,
    'en-IN': eninData,
    'en-US': enusData,
};
