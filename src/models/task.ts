import { Idable } from '~/models';

export type Task = {
    title: string;
    boardId: string;
    description: string;
    created: string;
    expired: string;
} & Idable;
