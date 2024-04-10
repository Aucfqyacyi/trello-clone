import { UserOption } from '~/components';
import { Tag, Task } from '~/models';

export type TaskForm = {
    author?: UserOption;
    assignTo?: UserOption;
    tags: Tag[];
} & Task;
