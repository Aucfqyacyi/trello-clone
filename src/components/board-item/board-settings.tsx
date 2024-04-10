import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import {
    HStack,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from '@chakra-ui/react';
import { HuePicker } from 'react-color';
import { useAppDispatch } from '~/hooks';
import { boardSlice } from '~/store';

export type BoardSettingsPopoverProps = {
    boardId: string;
    color: string;
    canBeDeleted: boolean;
    tasksCount: number;
};

export function BoardSettings({ boardId, color, canBeDeleted, tasksCount }: BoardSettingsPopoverProps) {
    const dispatch = useAppDispatch();
    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <IconButton
                    position="absolute"
                    top={0}
                    right={0}
                    aria-label="Settings"
                    bg={'white'}
                    icon={<SettingsIcon />}
                />
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.200" borderColor="blue.200">
                <PopoverHeader pt={4} fontWeight="bold" border="0">
                    Manage The Board
                </PopoverHeader>
                <PopoverArrow bg="blue.300" />
                <PopoverCloseButton />
                <PopoverBody zIndex={'99'}>
                    <HStack align="center" spacing={4}>
                        <HuePicker
                            color={color}
                            onChange={(colorResult) =>
                                dispatch(boardSlice.actions.setColor({ id: boardId, color: colorResult.hex }))
                            }
                        />
                        <IconButton
                            aria-label="Delete board"
                            bg={'white'}
                            icon={<DeleteIcon />}
                            onClick={() => {
                                if (canBeDeleted && tasksCount == 0)
                                    dispatch(boardSlice.actions.removeBoard({ id: boardId }));
                                else alert("You can't delete this board!");
                            }}
                        />
                    </HStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
