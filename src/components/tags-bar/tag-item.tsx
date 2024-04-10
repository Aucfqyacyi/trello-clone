import { CloseIcon } from '@chakra-ui/icons';
import { Badge, Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { ColorPickerPopup } from '~/components';
import { useAppDispatch } from '~/hooks';
import { Tag } from '~/models';
import { tagSlice } from '~/store';

export type TagItemProps = {
    totalTagsCount: number;
} & Tag;

export function TagItem({ id, color, totalTagsCount, value }: TagItemProps) {
    const dispatch = useAppDispatch();
    return (
        <Badge w={'135px'} variant="solid" bg={color} position={'relative'}>
            <ColorPickerPopup
                color={color}
                onColorChange={(newColor) => dispatch(tagSlice.actions.updateColor({ id, color: newColor }))}
            />
            <Editable
                fontWeight="bold"
                fontSize="10px"
                defaultValue={value}
                onSubmit={(newName) => dispatch(tagSlice.actions.updateName({ id, name: newName }))}>
                <EditablePreview />
                <EditableInput maxLength={13} minLength={2} fontSize="12px" />
            </Editable>
            <CloseIcon
                h="10px"
                w={'10px'}
                right={0}
                top={0}
                position={'absolute'}
                onClick={() => {
                    if (totalTagsCount > 2) dispatch(tagSlice.actions.removeTag({ id }));
                    else alert("You can't remove tags, because you must have less then 2 tags.");
                }}
            />
        </Badge>
    );
}
