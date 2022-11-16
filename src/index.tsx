import React from 'react';
import ReactDOM from 'react-dom/client';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import defaultTheme from 'styles/theme';
import GlobalStyle from 'styles/Global';
import store, { persistor } from 'redux/store';

import App from 'App';

import 'localization/i18n';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = document.getElementById('root');

if (!root) {
  throw new Error();
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
