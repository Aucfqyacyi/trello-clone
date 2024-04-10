import { AddIcon } from '@chakra-ui/icons';
import { HStack, IconButton } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { tagSlice } from '~/store';
import { TagItem } from './tag-item.tsx';

export function TagsBar() {
    const dispatch = useAppDispatch();
    const tags = useAppSelector((e) => e.tagReducer.tags);
    return (
        <HStack wrap={'wrap'} ml={2}>
            {tags.map((tag) => (
                <TagItem key={tag.id} {...tag} totalTagsCount={tags.length} />
            ))}
            <IconButton
                size={'sm'}
                aria-label="Add tag"
                icon={<AddIcon />}
                onClick={() => {
                    if (tags.length < 10) dispatch(tagSlice.actions.addTag('NewTag'));
                    else alert("You can't add more tags because the count of them can't be greater than 12.");
                }}
            />
        </HStack>
    );
}
