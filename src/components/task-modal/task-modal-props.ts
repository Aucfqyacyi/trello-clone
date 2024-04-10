import { Tag, Task, User } from '~/models';

export type TaskModalProps = {
    task?: Task;
    author?: User;
    assignTo?: User;
    tags?: Tag[];
    boardId: string;
    isOpen: boolean;
    onClose: () => void;
};
