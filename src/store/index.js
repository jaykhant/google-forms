import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'

import app from './App';

import auth from './Auth'
import authSaga from "./Auth/saga"

import form from './Form';
import formSaga from './Form/saga';

import shareForm from './ShareForm';

import responseView from './ResponseView'
import responseViewSaga from './ResponseView/saga'
import { moduleTypes } from './type';

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    auth, form, [moduleTypes.RESPONSE_VIEW]: responseView,[moduleTypes.SHARE_FORM]: shareForm,
    app: persistReducer({
        key: 'app',
        storage,
        version: '1.0.0',
    }, app)
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
});

export const persistor = persistStore(store)

sagaMiddleware.run(authSaga)
sagaMiddleware.run(formSaga)
sagaMiddleware.run(responseViewSaga)