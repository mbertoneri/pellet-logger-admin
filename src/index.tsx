import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';
import { FullPageLoader } from 'components/Layout/FullPageLoader/FullPageLoader';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from 'store';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Suspense fallback={<FullPageLoader />}>
        <Provider store={store}>
            <PersistGate persistor={persistStore(store)}>
                <BrowserRouter>
                    <LocalizationProvider dateAdapter={DateAdapter} locale="fr">
                        <App />
                    </LocalizationProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </Suspense>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
