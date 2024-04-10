import { SettingsIcon } from '@chakra-ui/icons';
import {
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Stack,
} from '@chakra-ui/react';
import { TwitterPicker } from 'react-color';
import { TagsBar } from '~/components';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { workplaceSlice } from '~/store';

export function WorkplaceSettings() {
    const dispatch = useAppDispatch();
    const color = useAppSelector((e) => e.workplaceReducer.workplace.color);
    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <IconButton aria-label="Settings" bg={'white'} icon={<SettingsIcon />} />
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.200" borderColor="blue.200">
                <PopoverHeader pt={4} fontWeight="bold" border="0">
                    Manage The Workplace
                </PopoverHeader>
                <PopoverArrow bg="blue.300" />
                <PopoverCloseButton />
                <PopoverBody>
                    <Stack align="center" spacing={4}>
                        <TwitterPicker
                            triangle={'hide'}
                            color={color}
                            onChange={(newColor) => dispatch(workplaceSlice.actions.setColor(newColor.hex))}
                        />
                        <TagsBar />
                    </Stack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
