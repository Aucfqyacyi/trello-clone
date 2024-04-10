import { Avatar } from '@chakra-ui/react';
import { components, ControlProps } from 'react-select';
import { UserOption } from '~/components';

export const Control = ({ children, ...props }: ControlProps<UserOption, false>) => {
    const value = props.getValue()[0];
    return (
        <components.Control {...props}>
            {value?.picture ? <Avatar size={'sm'} src={value.picture.thumbnail} ml={2} /> : <></>}
            {children}
        </components.Control>
    );
};
