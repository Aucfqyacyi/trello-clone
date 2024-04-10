import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workplace } from '~/models';

type WorkplaceState = {
    workplace: Workplace;
};

const initialState: WorkplaceState = {
    workplace: {
        color: 'white',
        name: 'Name of workplace',
        currentView: 'Table',
    },
};

export const workplaceSlice = createSlice({
    name: 'workplaceSlice',
    initialState,
    reducers: {
        onApplicationStart() {},
        setWorkplace(state, action: PayloadAction<Workplace>) {
            state.workplace = action.payload;
        },
        setColor(state, action: PayloadAction<string>) {
            state.workplace.color = action.payload;
        },
        setName(state, action: PayloadAction<string>) {
            state.workplace.name = action.payload;
        },
        setCurrentView(state, action: PayloadAction<string>) {
            state.workplace.currentView = action.payload;
        },
    },
});
export const workplaceReducer = workplaceSlice.reducer;
