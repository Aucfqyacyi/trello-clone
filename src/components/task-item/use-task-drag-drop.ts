import { SystemStyleObject } from '@chakra-ui/styled-system';
import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { Task } from '~/models';
import { taskSlice } from '~/store';

export function isObjOnTopWhenDragDrop(e: React.DragEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) {
    if (!ref.current) return false;
    const elementRect = ref.current.getBoundingClientRect();
    const elementCenterY = elementRect.top + elementRect.height / 2;
    return e.clientY < elementCenterY;
}

export function useTaskDragDrop(task: Task): {
    draggable: boolean;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    sx: SystemStyleObject;
    ref: React.RefObject<HTMLDivElement>;
} {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const [overedTaskId, setOveredTaskId] = useState<string>('');
    const [shadow, setShadow] = useState(5);
    const draggedTask = useAppSelector((e) => e.taskReducer.draggedTask);

    function onDragStart(_: React.DragEvent<HTMLDivElement>, task: Task) {
        dispatch(taskSlice.actions.setDraggedTask(task));
    }

    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        if (task.id !== overedTaskId) setOveredTaskId(task.id);
        if (!ref.current) return;
        if (isObjOnTopWhenDragDrop(e, ref)) setShadow(-5);
        else setShadow(5);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>, droppedInTask: Task) {
        e.preventDefault();
        if (!ref.current) return;
        dispatch(taskSlice.actions.onDragDropTask({ droppedInTask, moveToLeft: isObjOnTopWhenDragDrop(e, ref) }));
        setOveredTaskId('');
    }

    return {
        ref,
        draggable: true,
        onDragStart: (e) => onDragStart(e, task),
        onDragLeave: () => setOveredTaskId(''),
        onDragEnd: () => setOveredTaskId(''),
        onDragOver,
        onDrop: (e) => onDrop(e, task),
        sx:
            draggedTask && overedTaskId === task.id && draggedTask?.id !== task.id
                ? { boxShadow: `0px ${shadow}px 0px 0px black` }
                : { boxShadow: 'md' },
    };
}
