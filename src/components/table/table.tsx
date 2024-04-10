import { AddIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { BoardItem } from '~/components';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { boardSlice } from '~/store';

export function Table() {
    const boards = useAppSelector((e) => e.boardReducer.boards);
    const selectedTags = useAppSelector((e) => e.tagReducer.selectedTagIds);
    const dispatch = useAppDispatch();

    return (
        <Box ml={4} mt={4} h={'100%'}>
            <HStack spacing={4} align="top">
                <HStack spacing={4} align="start">
                    {[...boards].map((board) => (
                        <BoardItem key={board.id} {...board} />
                    ))}
                </HStack>
                {selectedTags.length === 0 ? (
                    <IconButton
                        icon={<AddIcon />}
                        size="lg"
                        aria-label="Add board"
                        onClick={() => {
                            if (boards.length < 6) dispatch(boardSlice.actions.addBoard());
                            else alert("You can't add more boards because the count of them can't be greater than 6.");
                        }}
                    />
                ) : (
                    <></>
                )}
            </HStack>
        </Box>
    );
}
