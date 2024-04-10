import { TimeIcon } from '@chakra-ui/icons';
import { Avatar, Badge, Box, CloseButton, Flex, HStack, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { shallowEqual } from 'react-redux';
import { TaskModal } from '~/components/task-modal';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { Task } from '~/models';
import { taskSlice } from '~/store';
import { convertTime } from '~/utilities';
import { useTaskDragDrop } from './use-task-drag-drop.ts';

export function TaskItem(task: Task) {
    const { id, title, expired } = task;
    const tags = useAppSelector(
        (e) => e.tagReducer.tags.filter((t) => t.taskIds.some((taskId) => taskId === id)),
        shallowEqual
    );
    const assignTo = useAppSelector((e) =>
        e.userReducer.users.find((u) => u.assignedTo.some((taskId) => taskId === id))
    );
    const author = useAppSelector((e) => e.userReducer.users.find((u) => u.authoredBy.some((taskId) => taskId === id)));
    const dispatch = useAppDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dragdrop = useTaskDragDrop(task);
    return (
        <>
            <TaskModal
                isOpen={isOpen}
                onClose={onClose}
                task={task}
                assignTo={assignTo}
                author={author}
                tags={tags}
                boardId={task.boardId}
            />
            <Box
                borderWidth="1px"
                bg={'white'}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                pt={1}
                px={3}
                pb={2}
                mb={2}
                cursor="grab"
                {...dragdrop}>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <HStack>
                        <Box>
                            {tags.map((tag) => (
                                <Badge fontSize="8px" variant="solid" key={tag.id} bg={tag.color} mr={2}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Box>
                    </HStack>
                    <CloseButton
                        aria-label="Delete"
                        size={'md'}
                        onClick={() => {
                            dispatch(taskSlice.actions.removeTask({ taskId: id }));
                        }}
                    />
                </Flex>
                <Box onClick={onOpen}>
                    <HStack my={2}>
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                            {title}
                        </Text>
                    </HStack>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                        <HStack>
                            <TimeIcon />
                            <Text fontSize="sm" fontWeight="bold">
                                {convertTime(expired)}
                            </Text>
                        </HStack>
                        <Tooltip label={assignTo ? assignTo.name.first + ' ' + assignTo.name.last : ''}>
                            <Avatar size={'sm'} src={assignTo ? assignTo.picture.thumbnail : 'https://example.url'} />
                        </Tooltip>
                    </Flex>
                </Box>
            </Box>
        </>
    );
}
