import { SystemStyleObject } from '@chakra-ui/styled-system';
import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { Board } from '~/models';
import { boardSlice, taskSlice } from '~/store';

export function isObjOnLeftWhenDragDrop(e: React.DragEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) {
    if (!ref.current) return false;
    const elementRect = ref.current.getBoundingClientRect();
    const elementCenterX = elementRect.left + elementRect.width / 2;
    return e.clientX < elementCenterX;
}

export function useBoardDragDrop(
    board: Board,
    tasksCount: number
): {
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
    const [overedBoardId, setOveredBoardId] = useState<string>('');
    const [shadow, setShadow] = useState(5);
    const draggedBoard = useAppSelector((e) => e.boardReducer.draggedBoard);
    const draggedTask = useAppSelector((e) => e.taskReducer.draggedTask);

    function onDragStart(_: React.DragEvent<HTMLDivElement>, board: Board) {
        dispatch(boardSlice.actions.setDraggedBoard(board));
    }

    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        if (board.id !== overedBoardId) setOveredBoardId(board.id);
        if (!ref.current || !draggedBoard) return;
        if (isObjOnLeftWhenDragDrop(e, ref)) setShadow(-5);
        else setShadow(5);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>, droppedInBoard: Board) {
        e.preventDefault();
        if (!ref.current) return;
        if (!draggedTask)
            dispatch(
                boardSlice.actions.onDragDropBoard({
                    droppedInBoard,
                    moveToLeft: isObjOnLeftWhenDragDrop(e, ref),
                })
            );
        if (tasksCount == 0) dispatch(taskSlice.actions.dropTaskInBoard({ boardId: droppedInBoard.id }));
        setOveredBoardId('');
    }

    return {
        ref,
        draggable: true,
        onDragStart: (e) => onDragStart(e, board),
        onDragLeave: () => setOveredBoardId(''),
        onDragEnd: () => setOveredBoardId(''),
        onDragOver,
        onDrop: (e) => onDrop(e, board),
        sx:
            !draggedTask && overedBoardId === board.id && draggedBoard?.id !== board.id
                ? { boxShadow: `${shadow}px 0px 0px 0px black` }
                : { boxShadow: `1px 3px 4px 4px ${board.color}` },
    };
}
