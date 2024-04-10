import { Idable } from '~/models';

export type Board = {
    title: string;
    color: string;
    canBeDeleted: boolean;
} & Idable;
