import { spawn, takeLatest } from 'redux-saga/effects';
import { getValuesFromLocalStorage, tagSlice, updateValuesInLocalStorage } from '~/store';

const tagsStorageKey = 'tags';
const selectedStorageKey = 'selectedTags';

function* updateTagsInLocalStorage() {
    yield updateValuesInLocalStorage(tagsStorageKey, (e) => e.tagReducer.tags);
}

function* getTagsFromLocalStorage() {
    yield getValuesFromLocalStorage(tagsStorageKey, tagSlice.actions.setTags);
}

function* updateSelectedTagsInLocalStorage() {
    yield updateValuesInLocalStorage(selectedStorageKey, (e) => e.tagReducer.selectedTagIds);
}

function* getSelectedTagsFromLocalStorage() {
    yield getValuesFromLocalStorage(selectedStorageKey, tagSlice.actions.setSelectedTagIds);
}

export function* tagWatcher() {
    yield spawn(getTagsFromLocalStorage);
    yield spawn(getSelectedTagsFromLocalStorage);
    yield takeLatest(tagSlice.actions.setSelectedTagIds.type, updateSelectedTagsInLocalStorage);
    yield takeLatest(tagSlice.actions.updateName.type, updateTagsInLocalStorage);
    yield takeLatest(tagSlice.actions.updateColor.type, updateTagsInLocalStorage);
    yield takeLatest(tagSlice.actions.removeTag.type, updateTagsInLocalStorage);
    yield takeLatest(tagSlice.actions.addTag.type, updateTagsInLocalStorage);
    yield takeLatest(tagSlice.actions.addTask.type, updateTagsInLocalStorage);
}
