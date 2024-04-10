import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { Tag } from '~/models';

type TagState = {
    tags: Tag[];
    selectedTagIds: string[];
};

const initialState: TagState = {
    tags: [
        {
            id: '1',
            label: 'Backend',
            value: 'Backend',
            color: 'green',
            taskIds: [],
        },
        {
            id: '2',
            label: 'Frontend',
            value: 'Frontend',
            color: 'blue',
            taskIds: [],
        },
        {
            id: '3',
            label: 'Devops',
            value: 'Devops',
            color: 'orange',
            taskIds: [],
        },
    ],
    selectedTagIds: [],
};

export const tagSlice = createSlice({
    name: 'tagSlice',
    initialState,
    reducers: {
        onApplicationStart() {},
        setTags(state, { payload }: PayloadAction<Tag[]>) {
            state.tags = payload;
        },
        addTag(state, { payload }: PayloadAction<string>) {
            state.tags = [
                ...state.tags,
                {
                    id: uuid(),
                    label: payload,
                    value: payload,
                    color: 'black',
                    taskIds: [],
                },
            ];
        },
        removeTag(state, { payload }: PayloadAction<{ id: string }>) {
            state.tags = state.tags.filter((e) => e.id !== payload.id);
        },
        updateName(state, { payload }: PayloadAction<{ id: string; name: string }>) {
            const tag = state.tags.find((e) => e.id === payload.id);
            if (tag) {
                tag.value = payload.name;
                tag.label = payload.name;
            }
        },
        updateColor(state, { payload }: PayloadAction<{ id: string; color: string }>) {
            const tag = state.tags.find((e) => e.id === payload.id);
            if (tag) tag.color = payload.color;
        },
        setSelectedTagIds(state, { payload }: PayloadAction<string[]>) {
            state.selectedTagIds = payload;
        },
        addTask(state, { payload }: PayloadAction<{ tagIds: string[]; taskId: string }>) {
            const tags = state.tags.filter((tag) => payload.tagIds.some((id) => id === tag.id));
            const oldTags = state.tags.filter((tag) => tag.taskIds.some((id) => id === payload.taskId));
            oldTags.forEach((tag) => (tag.taskIds = tag.taskIds.filter((e) => e !== payload.taskId)));
            tags.forEach((tag) => tag.taskIds.push(payload.taskId));
        },
    },
});

export const tagReducer = tagSlice.reducer;
