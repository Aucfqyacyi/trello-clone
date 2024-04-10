import { Action } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';
import { RootState, selectApp } from '~/store';

export function* updateValuesInLocalStorage<TValue>(key: string, selector: (s: RootState) => TValue) {
    const values: unknown = yield selectApp(selector);
    localStorage.setItem(key, JSON.stringify(values));
}

export function* getValuesFromLocalStorage<TValue>(key: string, action: (values: TValue[]) => Action) {
    const valuesStr = localStorage.getItem(key);
    if (!valuesStr) return;
    const values = JSON.parse(valuesStr) as TValue[];
    if (values.length === 0) return;
    yield put(action(values));
}
