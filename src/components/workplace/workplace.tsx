import { Calendar } from 'rsuite';
import { CalendarCell, Table } from '~/components';
import { useAppSelector } from '~/hooks';
import { Header } from './inner-components';
import './style.css';

export function Workplace() {
    const currentView = useAppSelector((e) => e.workplaceReducer.workplace.currentView);
    return (
        <>
            <Header />
            {currentView === 'Table' ? (
                <Table />
            ) : (
                <Calendar bordered cellClassName={() => 'calender-cell'} renderCell={CalendarCell} />
            )}
        </>
    );
}
