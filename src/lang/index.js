import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import frLang from './entries/fr-FR'

const AppLocale = {
    fr: frLang,
    en: enLang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.fr.data);

export default AppLocale;
