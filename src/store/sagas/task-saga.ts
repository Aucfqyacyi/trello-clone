import { spawn, takeLatest } from 'redux-saga/effects';
import { getValuesFromLocalStorage, taskSlice, updateValuesInLocalStorage } from '~/store';

const localStorageKey = 'tasks';

function* updateTasksInLocalStorage() {
    yield updateValuesInLocalStorage(localStorageKey, (e) => e.taskReducer.tasks);
}

function* getTasksFromLocalStorage() {
    yield getValuesFromLocalStorage(localStorageKey, taskSlice.actions.setTasks);
}

export function* taskWatcher() {
    yield spawn(getTasksFromLocalStorage);
    yield takeLatest(taskSlice.actions.updateTask.type, updateTasksInLocalStorage);
    yield takeLatest(taskSlice.actions.dropTaskInBoard.type, updateTasksInLocalStorage);
    yield takeLatest(taskSlice.actions.onDragDropTask.type, updateTasksInLocalStorage);
    yield takeLatest(taskSlice.actions.removeTask.type, updateTasksInLocalStorage);
}
