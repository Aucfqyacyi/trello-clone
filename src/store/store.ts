import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { SelectEffect, select } from 'redux-saga/effects';
import { rootReducer } from './root-reducer.ts';
import { rootSaga } from './root-saga.ts';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export function* selectApp<T>(selector: (s: RootState) => T): Generator<SelectEffect, T, T> {
    return yield select(selector);
}
