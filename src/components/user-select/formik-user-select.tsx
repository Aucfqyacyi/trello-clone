import { FieldHookConfig, useField } from 'formik';
import { SingleValue } from 'react-select';
import { UserOption, UserSelect, UserSelectProps } from '~/components';

export function FormikUserSelect({ placeholder, ...rest }: UserSelectProps & FieldHookConfig<SingleValue<UserOption>>) {
    const [field, , helpers] = useField(rest);
    return (
        <UserSelect
            placeholder={placeholder}
            defaultValue={field.value}
            onChange={async (user) => await helpers.setValue(user)}
        />
    );
}
