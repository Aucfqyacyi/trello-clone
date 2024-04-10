import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '~/models';
import { updateArrayOnDragDrop } from '~/utilities';

type TaskState = {
    tasks: Task[];
    draggedTask?: Task;
};

const initialState: TaskState = {
    tasks: [],
    draggedTask: undefined,
};

export const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        onApplicationStart() {},
        setTasks(state, { payload }: PayloadAction<Task[]>) {
            state.tasks = payload;
        },
        updateTask(state, action: PayloadAction<Task>) {
            const oldTask = state.tasks.find((b) => b.id == action.payload.id);
            if (!oldTask) {
                state.tasks = [...state.tasks, action.payload];
                return;
            }

            oldTask.title = action.payload.title;
            oldTask.boardId = action.payload.boardId;
            oldTask.description = action.payload.description;
            oldTask.created = action.payload.created;
            oldTask.expired = action.payload.expired;
        },
        removeTask(state, action: PayloadAction<{ taskId: string }>) {
            state.tasks = state.tasks.filter((item: Task) => item.id !== action.payload.taskId);
        },
        setDraggedTask(state, action: PayloadAction<Task>) {
            state.draggedTask = action.payload;
        },
        dropTaskInBoard(state, action: PayloadAction<{ boardId: string }>) {
            if (!state.draggedTask) return;
            const task = state.tasks.find((e) => e.id == state.draggedTask!.id);
            if (task) task.boardId = action.payload.boardId;
            state.draggedTask = undefined;
        },
        onDragDropTask(state, action: PayloadAction<{ droppedInTask: Task; moveToLeft: boolean }>) {
            const { droppedInTask, moveToLeft } = action.payload;
            if (!state.draggedTask || state.draggedTask.id == droppedInTask.id) return;

            state.tasks = updateArrayOnDragDrop(
                state.tasks,
                {
                    ...state.draggedTask,
                    boardId: droppedInTask.boardId,
                },
                droppedInTask,
                moveToLeft
            );
            state.draggedTask = undefined;
        },
    },
});
export const taskReducer = taskSlice.reducer;
