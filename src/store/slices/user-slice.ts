import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '~/models';

type UserState = {
    users: User[];
};

const initialState: UserState = {
    users: [
        {
            id: '1',
            gender: 'female',
            name: {
                first: 'Ronja',
                last: 'Roche',
            },
            picture: {
                thumbnail: 'https://randomuser.me/api/portraits/thumb/women/49.jpg',
            },
            assignedTo: [],
            authoredBy: [],
        },
        {
            id: '2',
            gender: 'female',
            name: {
                first: 'Emilia',
                last: 'Keranen',
            },
            picture: {
                thumbnail: 'https://randomuser.me/api/portraits/thumb/women/70.jpg',
            },
            assignedTo: [],
            authoredBy: [],
        },
        {
            id: '3',
            gender: 'female',
            name: {
                first: 'Mónica',
                last: 'Trujillo',
            },
            picture: {
                thumbnail: 'https://randomuser.me/api/portraits/thumb/women/18.jpg',
            },
            assignedTo: [],
            authoredBy: [],
        },
        {
            id: '4',
            gender: 'male',
            name: {
                first: 'Milan',
                last: 'Voß',
            },
            picture: {
                thumbnail: 'https://randomuser.me/api/portraits/thumb/men/87.jpg',
            },
            assignedTo: [],
            authoredBy: [],
        },
        {
            id: '5',
            gender: 'male',
            name: {
                first: 'Kristupas',
                last: 'Bjørnsen',
            },
            picture: {
                thumbnail: 'https://randomuser.me/api/portraits/thumb/men/59.jpg',
            },
            assignedTo: [],
            authoredBy: [],
        },
    ],
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        onApplicationStart() {},
        setUsers(state, { payload }: PayloadAction<User[]>) {
            state.users = payload;
        },
        fetchUser() {},
        addUser(state, action: PayloadAction<User>) {
            state.users = [...state.users, action.payload];
        },
        removeUser(state, action: PayloadAction<{ id: string }>) {
            state.users = state.users.filter((e) => e.id !== action.payload.id);
        },
        assignTo(state, { payload }: PayloadAction<{ userId: string; taskId: string }>) {
            const user = state.users.find((u) => u.id === payload.userId);
            if (!user) return;
            const oldUser = state.users.find((u) => u.assignedTo.some((e) => e === payload.taskId));
            if (oldUser) {
                oldUser.assignedTo = oldUser.assignedTo.filter((e) => e !== payload.taskId);
            }
            user.assignedTo.push(payload.taskId);
        },
        authorBy(state, { payload }: PayloadAction<{ userId: string; taskId: string }>) {
            const user = state.users.find((e) => e.id === payload.userId);
            if (!user) return;
            const oldUser = state.users.find((u) => u.authoredBy.some((e) => e === payload.taskId));
            if (oldUser) {
                oldUser.authoredBy = oldUser.authoredBy.filter((e) => e !== payload.taskId);
            }
            user.authoredBy.push(payload.taskId);
        },
    },
});
export const userReducer = userSlice.reducer;
