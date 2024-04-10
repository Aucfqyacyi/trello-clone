import { FieldHookConfig, useField } from 'formik';
import { MultiValue } from 'react-select';
import { TagSelect, TagSelectProps } from '~/components';
import { Tag } from '~/models';

export function FormikTagSelect({ maxItems, placeholder, ...rest }: TagSelectProps & FieldHookConfig<MultiValue<Tag>>) {
    const [field, , helpers] = useField(rest);

    return (
        <TagSelect
            maxItems={maxItems}
            placeholder={placeholder}
            onChange={async (tag) => await helpers.setValue(tag)}
            defaultValue={field.value}
        />
    );
}
