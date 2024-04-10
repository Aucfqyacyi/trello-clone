import { put, spawn, takeLatest } from 'redux-saga/effects';
import { Workplace } from '~/models';
import { selectApp, workplaceSlice } from '~/store';

const localStorageKey = 'workplace';

function* updateWorkplaceInLocalStorage() {
    const values: unknown = yield selectApp((e) => e.workplaceReducer.workplace);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
}

function* getWorkplaceFromLocalStorage() {
    const valuesStr = localStorage.getItem(localStorageKey);
    if (!valuesStr) return;
    const workplace = JSON.parse(valuesStr) as Workplace;
    if (workplace) yield put(workplaceSlice.actions.setWorkplace(workplace));
}

export function* workplaceWatcher() {
    yield spawn(getWorkplaceFromLocalStorage);
    yield takeLatest(workplaceSlice.actions.setName.type, updateWorkplaceInLocalStorage);
    yield takeLatest(workplaceSlice.actions.setCurrentView.type, updateWorkplaceInLocalStorage);
    yield takeLatest(workplaceSlice.actions.setColor.type, updateWorkplaceInLocalStorage);
}
