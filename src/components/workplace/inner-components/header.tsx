import { Box, Editable, EditableInput, EditablePreview, Flex, HStack, Select } from '@chakra-ui/react';
import { TagSelect, UsersBar } from '~/components';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { tagSlice, workplaceSlice } from '~/store';
import { WorkplaceSettings } from './workplace-settings.tsx';

export function Header() {
    const name = useAppSelector((e) => e.workplaceReducer.workplace.name);
    const currentView = useAppSelector((e) => e.workplaceReducer.workplace.currentView);
    const dispatch = useAppDispatch();
    return (
        <Flex p="4" bg="white">
            <Box mr="4">
                <Select
                    defaultValue={currentView}
                    onChange={(e) => dispatch(workplaceSlice.actions.setCurrentView(e.target.value))}>
                    <option value="Table">Table</option>
                    <option value="Calendar">Calendar</option>
                </Select>
            </Box>
            <HStack position={'relative'}>
                <Editable
                    fontWeight="bold"
                    fontSize="lg"
                    defaultValue={name}
                    onSubmit={(value) => dispatch(workplaceSlice.actions.setName(value))}>
                    <EditablePreview />
                    <EditableInput minLength={3} maxLength={24} />
                </Editable>
                <TagSelect
                    placeholder={'Filter by tag...'}
                    onChange={(tags) => dispatch(tagSlice.actions.setSelectedTagIds(tags.map((e) => e.id)))}
                />
                <UsersBar />
                <WorkplaceSettings />
            </HStack>
        </Flex>
    );
}
