import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { tagSlice, taskSlice, userSlice } from '~/store';
import { TaskForm } from './task-form.ts';
import { TaskModalProps } from './task-modal-props.ts';

export function useTaskModal({
    task,
    onClose,
    boardId,
    author,
    assignTo,
    tags,
}: TaskModalProps): [TaskForm, (taskForm: TaskForm) => void] {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((e) => e.taskReducer.tasks);

    function onSubmit(taskForm: TaskForm) {
        if (
            taskForm.title.trim() === '' ||
            taskForm.description.trim() === '' ||
            taskForm.created.trim() === '' ||
            taskForm.expired.trim() === '' ||
            !taskForm.assignTo ||
            !taskForm.author
        ) {
            alert('Please fill in all fields!');
            return;
        }
        if (!taskForm.id && !tasks.every((e) => e.title !== taskForm.title)) {
            alert('Task with the same title has been already created!');
            return;
        }
        const taskId = taskForm.id.trim() !== '' ? taskForm.id : uuid();
        dispatch(
            taskSlice.actions.updateTask({
                ...taskForm,
                boardId,
                id: taskId,
            })
        );
        dispatch(userSlice.actions.assignTo({ userId: taskForm.assignTo!.id, taskId: taskId }));
        dispatch(userSlice.actions.authorBy({ userId: taskForm.author!.id, taskId: taskId }));
        dispatch(tagSlice.actions.addTask({ tagIds: taskForm.tags.map((tag) => tag.id), taskId: taskId }));
        onClose();
    }
    if (task) {
        const authorName = author?.name.first + ' ' + author?.name.last;
        const assignToName = assignTo?.name.first + ' ' + assignTo?.name.last;
        return [
            {
                ...task,
                author: author
                    ? {
                          ...author,
                          label: authorName,
                          value: authorName,
                      }
                    : undefined,
                assignTo: assignTo
                    ? {
                          ...assignTo,
                          label: assignToName,
                          value: assignToName,
                      }
                    : undefined,
                tags: tags ?? [],
            },
            onSubmit,
        ];
    } else
        return [
            {
                id: '',
                title: '',
                created: '',
                expired: '',
                description: '',
                boardId: '',
                tags: [],
                assignTo: undefined,
                author: undefined,
            },
            onSubmit,
        ];
}
