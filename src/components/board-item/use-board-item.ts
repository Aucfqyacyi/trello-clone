import { shallowEqual } from 'react-redux';
import { useAppSelector } from '~/hooks';
import { Task } from '~/models';

export function useBoardItem(boardId: string): [boolean, Task[]] {
    const selectedTagIds = useAppSelector((e) => e.tagReducer.selectedTagIds);
    const selectedTags = useAppSelector((e) =>
        e.tagReducer.tags.filter((tag) => selectedTagIds.some((tagId) => tagId == tag.id))
    );
    const tasks = useAppSelector(
        (e) =>
            e.taskReducer.tasks.filter(
                (task) =>
                    task.boardId == boardId &&
                    (selectedTags.length === 0 ||
                        selectedTags.every((tag) => tag.taskIds.some((taskId) => taskId === task.id)))
            ),
        shallowEqual
    );
    return [!(selectedTagIds.length > 0 && tasks.length === 0), tasks];
}
