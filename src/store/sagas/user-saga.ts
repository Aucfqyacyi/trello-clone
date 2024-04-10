import axios, { AxiosResponse } from 'axios';
import { call, put, spawn, takeLatest } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';
import { User } from '~/models';
import { getValuesFromLocalStorage, updateValuesInLocalStorage, userSlice } from '~/store';

const localStorageKey = 'users';

function* updateUsersInLocalStorage() {
    yield updateValuesInLocalStorage(localStorageKey, (e) => e.userReducer.users);
}

function* getUsersFromLocalStorage() {
    yield getValuesFromLocalStorage(localStorageKey, userSlice.actions.setUsers);
}

function* fetchUser() {
    type UserResult = {
        results: User[];
    };
    const userResult: AxiosResponse<UserResult> = yield call(axios.get<UserResult>, 'https://randomuser.me/api/');
    const user = userResult.data.results[0];
    user.id = uuid();
    user.authoredBy = [];
    user.assignedTo = [];
    yield put(userSlice.actions.addUser(user));
}

export function* userWatcher() {
    yield spawn(getUsersFromLocalStorage);
    yield takeLatest(userSlice.actions.addUser.type, updateUsersInLocalStorage);
    yield takeLatest(userSlice.actions.removeUser.type, updateUsersInLocalStorage);
    yield takeLatest(userSlice.actions.authorBy.type, updateUsersInLocalStorage);
    yield takeLatest(userSlice.actions.assignTo.type, updateUsersInLocalStorage);
    yield takeLatest(userSlice.actions.fetchUser.type, fetchUser);
}
