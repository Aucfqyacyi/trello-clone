import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Workplace } from '~/components';
import { useAppSelector } from '~/hooks';
import './App.css';

export default function App() {
    const color = useAppSelector((e) => e.workplaceReducer.workplace.color);
    const theme = extendTheme({
        styles: {
            global: {
                body: {
                    bg: color,
                },
            },
        },
    });
    return (
        <ChakraProvider theme={theme}>
            <Workplace />
        </ChakraProvider>
    );
}
