import { default as Select } from 'react-select';
import { UserOption, UserSelectProps } from '~/components';
import { useAppSelector } from '~/hooks';
import { Control } from './inner-components/control.tsx';
import { Option } from './inner-components/option.tsx';

export function UserSelect({ placeholder, onChange, defaultValue }: UserSelectProps) {
    const options = useAppSelector((e) => e.userReducer.users).map<UserOption>((user) => {
        const name = user.name.first + ' ' + user.name.last;
        return {
            ...user,
            value: name,
            label: name,
        };
    });
    return (
        <Select<UserOption>
            placeholder={placeholder ?? 'Select user...'}
            options={options}
            defaultValue={defaultValue}
            onChange={(user) => {
                if (onChange) onChange(user);
            }}
            components={{ Option, Control }}
        />
    );
}
