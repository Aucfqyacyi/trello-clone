import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { Board } from '~/models';
import { updateArrayOnDragDrop } from '~/utilities';

type BoardState = {
    boards: Board[];
    draggedBoard?: Board;
};

const initialState: BoardState = {
    boards: [
        {
            id: '1',
            title: 'To Do',
            color: '#1464e3',
            canBeDeleted: false,
        },
        {
            id: '2',
            title: 'In Progress',
            color: '#3ae314',
            canBeDeleted: false,
        },
        {
            id: '3',
            title: 'Done',
            color: '#edf511',
            canBeDeleted: false,
        },
    ],
    draggedBoard: undefined,
};

export const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        onApplicationStart() {},
        setBoards(state, { payload }: PayloadAction<Board[]>) {
            state.boards = payload;
        },
        setColor(state, action: PayloadAction<{ id: string; color: string }>) {
            const board = state.boards.find((b) => b.id == action.payload.id);
            if (board) board.color = action.payload.color;
        },
        setTitle(state, action: PayloadAction<{ id: string; title: string }>) {
            const board = state.boards.find((b) => b.id == action.payload.id);
            if (board) board.title = action.payload.title;
        },
        addBoard(state) {
            const board: Board = {
                id: uuid(),
                title: 'New Board',
                canBeDeleted: true,
                color: 'lightgrey',
            };
            state.boards = [...state.boards, board];
        },
        removeBoard(state, action: PayloadAction<{ id: string }>) {
            state.boards = state.boards.filter((item: Board) => item.id !== action.payload.id);
        },
        setDraggedBoard(state, action: PayloadAction<Board>) {
            state.draggedBoard = action.payload;
        },
        onDragDropBoard(state, action: PayloadAction<{ droppedInBoard: Board; moveToLeft: boolean }>) {
            if (!state.draggedBoard) return;
            state.boards = updateArrayOnDragDrop(
                state.boards,
                state.draggedBoard,
                action.payload.droppedInBoard,
                action.payload.moveToLeft
            );
            state.draggedBoard = undefined;
        },
    },
});
export const boardReducer = boardSlice.reducer;
