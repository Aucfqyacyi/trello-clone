import { Stack } from '@chakra-ui/react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '~/hooks';
import { CalendarCellItem } from './calendar-cell-item.tsx';

export function CalendarCell(date: Date) {
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const tasks = useAppSelector((e) => e.taskReducer.tasks.filter((e) => e.expired === dateString), shallowEqual);

    return (
        <Stack>
            {tasks.map((task) => (
                <CalendarCellItem key={task.id} {...task} />
            ))}
        </Stack>
    );
}
