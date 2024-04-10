import { spawn } from 'redux-saga/effects';
import { boardWatcher, tagWatcher, taskWatcher, userWatcher } from '~/store';
import { workplaceWatcher } from '~/store/sagas/workplace-saga.ts';

export function* rootSaga() {
    yield spawn(taskWatcher);
    yield spawn(userWatcher);
    yield spawn(tagWatcher);
    yield spawn(boardWatcher);
    yield spawn(workplaceWatcher);
}
