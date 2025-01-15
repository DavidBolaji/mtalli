"use client";

import { IntlProvider } from 'react-intl';
import enMessages from '../i18n/en.json';
import frMessages from '../i18n/fr.json';
import { PropsWithChildren } from 'react';
import { useLanguage } from '@/hooks/use-language';


const messages = {
  en: enMessages,
  fr: frMessages,
};

const IntlProviderWrapper:React.FC<PropsWithChildren> = ({ children }) => {
    const {language} = useLanguage()
    
  
    return (
      <IntlProvider
        locale={language ? language : 'en'}
        defaultLocale="en"
        messages={messages[language? language : 'en']}
      >
        {children}
      </IntlProvider>
    );
};

export default IntlProviderWrapper;
