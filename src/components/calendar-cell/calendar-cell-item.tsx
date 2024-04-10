import { Avatar, Badge, Box, CloseButton, Flex, HStack, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { shallowEqual } from 'react-redux';
import { TaskModal } from '~/components';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { Task } from '~/models';
import { taskSlice } from '~/store';

export function CalendarCellItem(task: Task) {
    const { id, title, boardId } = task;
    const tags = useAppSelector(
        (e) => e.tagReducer.tags.filter((t) => t.taskIds.some((taskId) => taskId === id)),
        shallowEqual
    );
    const assignTo = useAppSelector(
        (e) => e.userReducer.users.find((u) => u.assignedTo.some((taskId) => taskId === id)),
        shallowEqual
    );
    const author = useAppSelector((e) => e.userReducer.users.find((u) => u.authoredBy.some((taskId) => taskId === id)));
    const dispatch = useAppDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box borderWidth="1px" bg={'white'} borderRadius="lg" overflow="hidden" boxShadow="md" px={3} onClick={onOpen}>
            <TaskModal
                isOpen={isOpen}
                onClose={onClose}
                task={task}
                assignTo={assignTo}
                author={author}
                tags={tags}
                boardId={boardId}
            />
            <Flex alignItems={'center'} justifyContent={'space-between'}>
                <HStack>
                    <Box>
                        {tags
                            .filter((t) => t.taskIds.some((taskId) => taskId === id))
                            .map((tag) => (
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
            <Flex alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <Text fontSize="md" fontWeight="bold" mb={2}>
                    {title}
                </Text>
                <Tooltip label={assignTo ? assignTo.name.first + ' ' + assignTo.name.last : ''}>
                    <Avatar size={'sm'} src={assignTo ? assignTo.picture.thumbnail : 'https://example.url'} />
                </Tooltip>
            </Flex>
        </Box>
    );
}
