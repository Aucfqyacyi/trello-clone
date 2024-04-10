import { SingleValue } from 'react-select';
import { User } from '~/models';

export type UserSelectProps = {
    placeholder?: string;
    onChange?: (tags: SingleValue<UserOption>) => void;
    defaultValue?: SingleValue<UserOption>;
};

export type UserOption = {
    label: string;
    value: string;
} & User;
