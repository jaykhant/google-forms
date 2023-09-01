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

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    auth, form,
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