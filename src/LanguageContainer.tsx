import * as React from 'react';
import App from './App';
import * as locale_en from 'react-intl/locale-data/en';
import * as locale_de from 'react-intl/locale-data/de';
import * as locale_fr from 'react-intl/locale-data/fr';
import * as locale_ar from 'react-intl/locale-data/ar';
import * as locale_zh from 'react-intl/locale-data/zh';
import * as messages_fr from './translations/locales/fr.json';
import * as messages_ar from './translations/locales/ar.json';
import * as messages_de from './translations/locales/de.json';
import * as messages_zh from './translations/locales/zh.json';
import { IntlProvider, addLocaleData } from 'react-intl';

addLocaleData([...locale_en, ...locale_de, ...locale_ar, ...locale_fr, ...locale_zh]);

interface State { locale: string }

const messages = {
    'en': null,
    'fr': messages_fr,
    'ar': messages_ar,
    'de': messages_de,
    'zh': messages_zh
}

class LanguageContainer extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            locale: 'en'
        }
    }

    public changeLanguage = (locale: string) => {
        this.setState({
            locale
        });
    }

    public render() {
        const msg = messages[this.state.locale];

        return (
            <IntlProvider key={this.state.locale} locale={this.state.locale} messages={msg}>
                <App changeLanguage={this.changeLanguage} currentLocale={this.state.locale}/>
            </IntlProvider>
        );
    }
}

export default LanguageContainer;
