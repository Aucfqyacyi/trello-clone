import { spawn, takeLatest } from 'redux-saga/effects';
import { boardSlice, getValuesFromLocalStorage, updateValuesInLocalStorage } from '~/store';

const localStorageKey = 'boards';

function* updateBoardsInLocalStorage() {
    yield updateValuesInLocalStorage(localStorageKey, (e) => e.boardReducer.boards);
}

function* getBoardsFromLocalStorage() {
    yield getValuesFromLocalStorage(localStorageKey, boardSlice.actions.setBoards);
}

export function* boardWatcher() {
    yield spawn(getBoardsFromLocalStorage);
    yield takeLatest(boardSlice.actions.removeBoard.type, updateBoardsInLocalStorage);
    yield takeLatest(boardSlice.actions.addBoard.type, updateBoardsInLocalStorage);
    yield takeLatest(boardSlice.actions.onDragDropBoard.type, updateBoardsInLocalStorage);
    yield takeLatest(boardSlice.actions.setTitle.type, updateBoardsInLocalStorage);
    yield takeLatest(boardSlice.actions.setColor.type, updateBoardsInLocalStorage);
}
