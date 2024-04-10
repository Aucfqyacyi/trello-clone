import { Avatar } from '@chakra-ui/react';
import { components, OptionProps } from 'react-select';
import { UserOption } from '~/components';

export const Option = ({ data, ...props }: OptionProps<UserOption>) => {
    return (
        <components.Option data={data} {...props}>
            <Avatar size={'sm'} src={data.picture.thumbnail} mr={4} />
            {props.children}
        </components.Option>
    );
};
