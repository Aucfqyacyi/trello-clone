import { useState } from 'react';
import Select from 'react-select';
import { TagSelectProps } from '~/components';
import { useAppSelector } from '~/hooks';
import { selectStylesConfig } from './select-styles-config.ts';

export function TagSelect({ maxItems, placeholder, onChange, defaultValue }: TagSelectProps) {
    const [count, setCount] = useState(0);
    const tags = useAppSelector((e) => e.tagReducer.tags);
    return (
        <Select
            isOptionDisabled={() => count >= (maxItems ?? tags.length)}
            closeMenuOnSelect={false}
            placeholder={placeholder ?? 'Select tag...'}
            isMulti
            options={tags}
            styles={selectStylesConfig}
            defaultValue={defaultValue}
            onChange={(tag) => {
                setCount(tag.length);
                if (onChange) onChange(tag);
            }}
        />
    );
}
