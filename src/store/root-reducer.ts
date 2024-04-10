import { combineReducers } from '@reduxjs/toolkit';
import { boardReducer, tagReducer, taskReducer, userReducer, workplaceReducer } from '~/store/slices';

export const rootReducer = combineReducers({
    boardReducer,
    tagReducer,
    taskReducer,
    workplaceReducer,
    userReducer,
});
