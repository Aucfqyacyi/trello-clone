import { MultiValue } from 'react-select';
import { Tag } from '~/models';

export type TagSelectProps = {
    maxItems?: number;
    placeholder?: string;
    onChange?: (tags: MultiValue<Tag>) => void;
    defaultValue?: MultiValue<Tag>;
};
