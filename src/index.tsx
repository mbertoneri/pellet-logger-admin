import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { FullPageLoader } from 'components/Layout/FullPageLoader/FullPageLoader';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from 'store';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Suspense fallback={<FullPageLoader />}>
        <Provider store={store}>
            <PersistGate persistor={persistStore(store)}>
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={LuxonUtils} locale="fr">
                        <App />
                    </MuiPickersUtilsProvider>
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
