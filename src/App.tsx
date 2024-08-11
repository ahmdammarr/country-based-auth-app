import React from 'react';

import {I18nextProvider} from 'react-i18next';
import i18n from '@/config/i18n';

import {CountryProvider} from '@/providers/CountryProvider';
import {Root} from './navigators/Root';
import {AuthProvider} from './providers/AuthProvider';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <CountryProvider>
        <AuthProvider>
          <Root />
        </AuthProvider>
      </CountryProvider>
    </I18nextProvider>
  );
};

export default App;
