import { AddIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    ButtonGroup,
    Editable,
    EditableInput,
    EditablePreview,
    IconButton,
    Stack,
    useDisclosure,
} from '@chakra-ui/react';
import { TaskItem, TaskModal } from '~/components';
import { useAppDispatch } from '~/hooks';
import { Board } from '~/models';
import { boardSlice } from '~/store';
import { BoardSettings } from './board-settings.tsx';
import { useBoardDragDrop } from './use-board-drag-drop.ts';
import { useBoardItem } from './use-board-item.ts';

export function BoardItem(board: Board) {
    const { id, title, color, canBeDeleted } = board;
    const [showBoard, tasks] = useBoardItem(id);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const { ref, sx, ...rest } = useBoardDragDrop(board, tasks.length);

    if (!showBoard) return <></>;
    return (
        <Box position="relative">
            <Box w="350px" bg={'white'} rounded="md" p={4} mb={4} sx={sx} ref={ref} {...rest} cursor="grab">
                <Editable
                    fontSize="xl"
                    fontWeight="semibold"
                    mb={2}
                    defaultValue={title}
                    onSubmit={(newTitle) => dispatch(boardSlice.actions.setTitle({ id, title: newTitle }))}>
                    <EditablePreview />
                    <EditableInput minLength={3} maxLength={24} />
                </Editable>
                <Stack>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} {...task} />
                    ))}
                    <ButtonGroup
                        size="sm"
                        isAttached
                        variant="ghost"
                        onClick={() => {
                            if (tasks.length < 10) onOpen();
                            else alert("You can't add more tasks because the count of them can't be greater than 10.");
                        }}>
                        <Button w="100%">Add another task</Button>
                        <IconButton aria-label="Add" icon={<AddIcon />} />
                    </ButtonGroup>
                    <TaskModal isOpen={isOpen} onClose={onClose} boardId={id} />
                </Stack>
            </Box>
            <BoardSettings boardId={id} color={color} canBeDeleted={canBeDeleted} tasksCount={tasks.length} />
        </Box>
    );
}
